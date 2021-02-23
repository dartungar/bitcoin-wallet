from .models import Transaction, Address
from .db import session
from sqlalchemy import func
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from random import randint
from typing import List, Optional
from bitcoinaddress import Wallet, Seed

app = FastAPI()

# CORS

origins = [
    "http://localhost:8000",
    "https://localhost:8000",
    "http://localhost:3000",
    "https://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models


class ITransaction(BaseModel):
    id: str
    input: str
    output: str
    amount: float
    fee: float
    timestamp: str


class IAddressData(BaseModel):
    address: str
    balance: float


class ISeed(BaseModel):
    seed: str


@app.get("/api/seed")
async def generate_seed():
    '''generate a new seed. \n 
       use its private key \n
       for prototyping only, use proper seed generation in prod 
    '''
    seed = Wallet().key.hex
    return seed


@app.post("/api/address")
async def add_address(seed: ISeed):
    '''
    add new address and return its key
    '''
    # TO DO: pass seed in request body
    # TO DO: проверить отличаются ли новые адреса для одного сида
    print(seed)
    key = generate_and_add_address(seed=seed.seed)
    return key


@app.get("/api/addresses", response_model=List[IAddressData])
async def get_addresses(seed: str):
    '''
    get addresses and their balance for given seed. \n
    seed should be encrypted in prod
    '''
    addresses = session.query(Address).filter_by(seed=seed).all()
    if not addresses:
        try:
            generate_dummy_addresses(seed)
            addresses = session.query(Address).filter_by(seed=seed).all()
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error creating dummy addresses")
    if addresses:
        addresses_data = []
        for a in addresses:
            balance_out = session.query(
                func.sum(Transaction.amount)).filter(Transaction.input_address == a.address).first()[0]
            balance_in = session.query(func.sum(Transaction.amount)).filter(
                Transaction.output_address == a.address).first()[0]
            if not balance_out:
                balance_out = 0
            if not balance_in:
                balance_in = 0
            total_operations = balance_in - balance_out
            if not total_operations:
                generate_dummy_transactions(a.address)
            addresses_data.append(
                {"address": a.address, "balance": a.initial_balance + balance_in - balance_out})
        return addresses_data
    else:
        raise HTTPException(
            status_code=404, detail=f"No addresses found for the seed")


@app.get("/api/transactions", response_model=List[ITransaction])
async def get_transactions(address: Optional[str] = None) -> List[ITransaction]:
    '''
    Get a list of transactions for a given address.
    '''
    #
    if address:
        transactions_raw = session.query(Transaction).filter_by(input_address=address).union(
            session.query(Transaction).filter_by(output_address=address)).all()
        if not transactions_raw:
            print('data not found, generating dummy data...')
            generate_dummy_transactions(address)
            transactions_raw = session.query(Transaction).filter_by(input_address=address).union(
                session.query(Transaction).filter_by(output_address=address)).all()
    else:
        transactions_raw = session.query(Transaction)

    transactions = [t.to_json() for t in transactions_raw]
    return transactions


def generate_and_add_address(seed: Optional[str] = None):
    '''
    generate new address, random or for given seed.
    '''
    # this is no proper address generation
    # but it is taking quite some time to get into bitcoin

    wallet = Wallet()
    key = wallet.address.pubkey
    new_address = Address(address=key, seed=seed)
    session.add(new_address)
    session.commit()
    return key


def generate_dummy_addresses(seed: str):
    '''
    Generate addresses for a given seed.\n
    Not a proper bitcoin address generation, for prototyping only.
    '''
    for i in range(10):
        generate_and_add_address(seed)


def generate_dummy_transactions(address: str):
    '''
    Generate random transactions with given address.
    '''
    for i in range(randint(0, 10)):
        if i % 2:
            inp = address
            outp = generate_and_add_address()
        else:
            inp = generate_and_add_address()
            outp = address
        transaction = Transaction(
            input_address=inp, output_address=outp, amount=randint(1, 1000), fee=randint(1, 7)/1000)
        session.add(transaction)
        session.commit()

from .models import Transaction
from fastapi import FastAPI
from pydantic import BaseModel
from .db import session
from random import randint
from typing import List

app = FastAPI()


class TransactionResponse(BaseModel):
    '''Pydantic model for response containing Transaction object'''
    id: str
    input: str
    output: str
    amount: float
    fee: float
    timestamp: str


@app.get("/api/transactions", response_model=List[TransactionResponse])
async def get_transactions(address: str) -> List[TransactionResponse]:
    '''
    Get a list of transactions for a given address.
    '''
    transactions_raw = session.query(Transaction).filter_by(input=address).union(
        session.query(Transaction).filter_by(output=address)).all()
    if not transactions_raw:
        print('data not found, generating dummy data...')
        generate_dummy_transactions(address)
        transactions_raw = session.query(Transaction).filter_by(input=address).union(
            session.query(Transaction).filter_by(output=address)).all()
    transactions = [t.to_json() for t in transactions_raw]
    return transactions


@app.get("/api/address")
async def get_addresses(seed: str):
    # TODO
    pass


@app.post("/api/address")
async def add_address(seed: str):
    pass


def generate_dummy_transactions(address: str):
    '''
    Generate random transactions with given address.
    '''
    for i in range(randint(0, 10)):
        if i % 2:
            inp = address
            outp = 'lol'
        else:
            inp = 'lol'
            outp = address
        transaction = Transaction(
            input=inp, output=outp, amount=randint(1, 1000), fee=randint(1, 7)/1000)
        session.add(transaction)
        session.commit()

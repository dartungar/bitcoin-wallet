from .models import Transaction
from fastapi import FastAPI
from pydantic import BaseModel
from .db import session
from random import randint
from typing import List

app = FastAPI()

# Pydantic model for response containing Transaction object


class TransactionResponse(BaseModel):
    id: str
    input: str
    output: str
    amount: float
    fee: float
    timestamp: str


@app.get("/api/transactions", response_model=List[TransactionResponse])
async def get_transactions(wallet: str):
    transactions_out = session.query(Transaction).filter_by(input=wallet).all()
    transactions_in = session.query(Transaction).filter_by(output=wallet).all()
    if not (transactions_in or transactions_out):
        print('data not found, generating dummy data...')
        generate_dummy_data(wallet)
        transactions_out = session.query(
            Transaction).filter_by(input=wallet).all()
        transactions_in = session.query(
            Transaction).filter_by(output=wallet).all()
    transactions = [t.to_json() for t in transactions_in] + \
        [t.to_json() for t in transactions_out]
    return transactions

# generate some random transaction
# with given wallet


def generate_dummy_data(wallet: str):
    for i in range(randint(0, 10)):
        if i % 2:
            inp = wallet
            outp = 'lol'
        else:
            inp = 'lol'
            outp = wallet
        transaction = Transaction(
            input=inp, output=outp, amount=randint(1, 1000), fee=randint(1, 7)/1000)
        session.add(transaction)
        session.commit()

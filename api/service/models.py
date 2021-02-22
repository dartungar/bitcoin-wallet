from random import randint
from sqlalchemy import Column, String, Float, DateTime, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from uuid import uuid4
from datetime import datetime
from .db import Base, engine


# transaction
class Transaction(Base):
    __tablename__ = "transaction"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid4, unique=True, nullable=False)
    # should've done relationship
    # but multiple FKs are tricky
    # works fine for prototype
    input_address = Column(String, nullable=False)
    output_address = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    fee = Column(Float, default=0.003, nullable=False)
    timestamp = Column(DateTime, default=datetime.now(), nullable=False)

    def to_json(self):
        item_obj = {"id": str(self.id), "input": self.input_address, "output": self.output_address,
                    "amount": self.amount, "fee": self.fee, "timestamp": str(self.timestamp)}
        return item_obj


# address
class Address(Base):
    __tablename__ = "address"
    address = Column(String, primary_key=True, unique=True, nullable=False)
    # should be hashed or otherwise protected in prod
    seed = Column(String, default='dummy', nullable=False)
    # for testing purposes only
    initial_balance = Column(Float, nullable=False, default=10000)


Base.metadata.create_all(engine)

from sqlalchemy import Column, String, Float, DateTime, DateTime
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4
from datetime import datetime
from .db import Base, engine
import json


# transaction
class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid4, unique=True, nullable=False)
    input = Column(String, nullable=False)
    output = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    fee = Column(Float, default=0.003, nullable=False)
    timestamp = Column(DateTime, default=datetime.now(), nullable=False)

    def to_json(self):
        item_obj = {"id": str(self.id), "input": self.input, "output": self.output,
                    "amount": self.amount, "fee": self.fee, "timestamp": str(self.timestamp)}
        return item_obj


Base.metadata.create_all(engine)

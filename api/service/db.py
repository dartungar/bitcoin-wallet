from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database
import os

Base = declarative_base()

db_url = os.environ['DB_URL']
if not database_exists(db_url):
    create_database(db_url)
# pool_pre_ping for pessimistic disconnect handling
# https://docs.sqlalchemy.org/en/13/core/pooling.html#disconnect-handling-pessimistic
engine = create_engine(db_url, pool_pre_ping=True)
DBsession = sessionmaker(bind=engine)
session = DBsession()

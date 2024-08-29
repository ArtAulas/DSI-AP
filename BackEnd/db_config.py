from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine=create_engine('sqlite:///DSI-AP.db')

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

#get_db função para acessar o banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
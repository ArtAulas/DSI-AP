from sqlalchemy import Column, Integer, String, Boolean
from pydantic import BaseModel
from db_config import Base
from datetime import datetime

#ORM-definir a tabela no banco de dados
class Usuario(Base):
    __tablename__='usuarios'
    id=Column('id',Integer, primary_key=True, autoincrement=True)
    nome=Column('nome',String(255),nullable=False)
    sobrenome=Column('sobrenome',String(255),nullable=False)
    email=Column('email',String(255), unique=True,nullable=False)
    telefone=Column('telefone',Integer,nullable=False)
    dt_confirm_email=Column('dt_confirm_email', String(25),nullable=False, default=datetime.now())
    dt_confirm_telefone=Column('dt_confirm_telefone', String(25),nullable=False, default=datetime.now())
    cpf=Column('cpf', Integer)
    anuncios=Column('anuncios',Boolean, default=False)

#schemas-utilizar para response e request
class UsuarioResponse(BaseModel):
    id: int
    nome: str
    sobrenome:str
    email: str
    telefone: int
    dt_confirm_email: str
    dt_confirm_telefone: str
    cpf:int
    anuncios: bool

    class Config:
        from_attributes=True

class UsuarioRequest(BaseModel):
    nome: str
    sobrenome:str
    email: str
    telefone: int
    cpf:int
    anuncios:bool
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from pydantic import BaseModel
from db_config import Base

#ORM-definir a tabela no banco de dados
class Endereco(Base):
    __tablename__='endereco'
    id_endereco=Column('id_endereco',Integer, primary_key=True, autoincrement=True)
    logradouro=Column('logradouro',String(255),nullable=False)
    numero=Column('numero', Integer,nullable=False)
    complemento=Column('complemento',String(255))
    ponto_de_referencia=Column('ponto_de_referencia',String(255))
    endereco_casa=Column('endereco_casa',Boolean, default=False)
    endereco_trabalho=Column('endereco_trabalho',Boolean, default=False)

    id_usuario=Column('id_usuario',ForeignKey('usuarios.id'),nullable=False)

class EnderecoRequest(BaseModel):
    logradouro:str
    numero:int
    complemento:str
    ponto_de_referencia:str
    endereco_casa:bool
    endereco_trabalho:bool
    id_usuario:int

class EnderecoResponse(BaseModel):
    id_endereco:int
    logradouro:str
    numero:int
    complemento:str
    ponto_de_referencia:str
    endereco_casa:bool
    endereco_trabalho:bool
    id_usuario:int

    class Config:
        from_attributes=True

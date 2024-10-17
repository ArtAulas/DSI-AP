from sqlalchemy import Column, Integer, String, Boolean
from pydantic import BaseModel
from db_config import Base

#ORM-definir a tabela no banco de dados
class Restaurante(Base):
    __tablename__='restaurante'
    id_restaurante=Column('id_restaurante',Integer, primary_key=True, autoincrement=True)
    nome_restaurante=Column('nome_restaurante',String(255),nullable=False)
    telefone_restaurante=Column('telefone_restaurante', Integer,nullable=False)
    email_restaurante=Column('email_restaurante',String(255), nullable=False)
    cep_restaurante=Column('cep_restaurante',Integer, nullable=False)
    estado_restaurante=Column('estado_restaurante',String(255))
    cidade_restaurante=Column('cidade_restaurante',String(255))
    cnpj_restaurante=Column('cnpj_restaurante',Integer, unique=True, nullable=False)
    especialidade_restaurante=Column('especialidade_restaurante',String(255), nullable=False)
    razao_social_restaurante=Column('razao_social_restaurante',String(255), nullable=False)
    plano_basico_restaurante=Column('plano_basico_restaurante', Boolean, default=False)
    plano_entrega_restaurante=Column('plano_entrega_restaurante', Boolean, default=False)

class RestauranteRequest(BaseModel):
    nome_restaurante:str
    telefone_restaurante:int
    email_restaurante:str
    cep_restaurante:int
    estado_restaurante:str
    cidade_restaurante:str
    cnpj_restaurante:int
    especialidade_restaurante:str
    razao_social_restaurante:str
    plano_basico_restaurante:bool
    plano_entrega_restaurante:bool

class RestauranteResponse(BaseModel):
    id_restaurante:int
    nome_restaurante:str
    telefone_restaurante:int
    email_restaurante:str
    cep_restaurante:int
    estado_restaurante:str
    cidade_restaurante:str
    cnpj_restaurante:int
    especialidade_restaurante:str
    razao_social_restaurante:str
    plano_basico_restaurante:bool
    plano_entrega_restaurante:bool

    class Config:
        from_attributes=True

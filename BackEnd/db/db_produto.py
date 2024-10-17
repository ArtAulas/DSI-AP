from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from pydantic import BaseModel
from db_config import Base

#ORM-definir a tabela no banco de dados
class Produto(Base):
    __tablename__='produto'
    id_produto=Column('id_produto',Integer, primary_key=True, autoincrement=True)
    nome_produto=Column('nome_produto',String(255),nullable=False)
    categoria_produto=Column('categoria_produto',String(255),nullable=False)
    descricao_produto=Column('descricao_produto',String(255))
    preco_produto=Column('preco_produto',Float,nullable=False)
    denunciar_produto=Column('denunciar_produto',Boolean, default=False)

    id_restaurante=Column('id_restaurante',ForeignKey('restaurante.id_restaurante'),nullable=False)

class ProdutoRequest(BaseModel):
    nome_produto:str
    categoria_produto:str
    descricao_produto:str
    preco_produto:float
    denunciar_produto:bool
    id_restaurante:int

class ProdutoResponse(BaseModel):
    id_produto:int
    nome_produto:str
    categoria_produto:str
    descricao_produto:str
    preco_produto:float
    denunciar_produto:bool
    id_restaurante:int

    class Config:
        from_attributes=True

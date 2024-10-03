from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from pydantic import BaseModel
from db_config import Base

class Item_Pedido(BaseModel):
    __tablename__='item_pedido'
    id_item_pedido=Column('id_item_pedido',Integer, primary_key=True, autoincrement=True)

    id_produto=Column('id_produto',ForeignKey('produto.id_produto'),nullable=False)

    preco_produto=Column('preco_produto',Float,nullable=False)
    quantidade_produto=Column('quantidade_produto',Integer,nullable=False)

    id_pedido=Column('id_pedido',ForeignKey('pedido.id_pedido'),nullable=False)

class ItemPedidoRequest(BaseModel):
    id_produto:int
    preco_produto:float
    quantidade_produto:int
    id_pedido:int

class ItemPedidoRequest(BaseModel):
    id_item_pedido:int
    id_produto:int
    preco_produto:float
    quantidade_produto:int
    id_pedido:int

    class Config:
        from_attributes=True
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from pydantic import BaseModel
from db_config import Base
from datetime import datetime

class Pedido(Base):
    __tablename__='pedido'
    id_pedido=Column('id_pedido',Integer, primary_key=True, autoincrement=True)
    forma_de_pagamento=Column('forma_de_pagamento',Integer,nullable=False)

    id_usuario=Column('id_usuario',ForeignKey('usuarios.id'),nullable=False)
    id_endereco=Column('id_endereco',ForeignKey('endereco.id_endereco'),nullable=False)
    id_restaurante=Column('id_restaurante',ForeignKey('restaurante.id_restaurante'),nullable=False)

    pagamento_gorjeta=Column('pagamento_gorjeta',Float,nullable=False)
    cpf_na_nota=Column('cpf_na_nota',Integer)
    codigo_cupom=Column('codigo_cupom',String(255))
    entrega_padrao=Column('entrega_padrao',Boolean, default=False)
    entrega_agendada=Column('entrega_agendada',Boolean, default=False)
    retirar_na_loja=Column('retirar_na_loja',Boolean, default=False)
    total_produtos=Column('tottal_produtos',Float,nullable=False)
    taxa_servico=Column('taxa_servicos',Float,nullable=False)
    data_e_hora_pedido=Column('data_e_hora_pedido',String(255),nullable=False, default=datetime.now())
    total_pedido=Column('total_pedido',Float,nullable=False)

class PedidoRequest(BaseModel):
    forma_de_pagamento:int
    id_usuario:int
    id_endereco:int
    id_restaurante:int
    pagamento_gorjeta:float
    cpf_na_nota:int
    codigo_cupom:str
    entrega_padrao:bool
    entrega_agendada:bool
    retirar_na_loja:bool
    total_produtos:float
    taxa_servico:float
    data_e_hora_pedido:str
    total_pedido:float

class PedidoResponse(BaseModel):
    id_pedido:int
    forma_de_pagamento:int
    id_usuario:int
    id_endereco:int
    id_restaurante:int
    pagamento_gorjeta:float
    cpf_na_nota:int
    codigo_cupom:str
    entrega_padrao:bool
    entrega_agendada:bool
    retirar_na_loja:bool
    total_produtos:float
    taxa_servico:float
    data_e_hora_pedido:str
    total_pedido:float

    class Config:
        from_attributes=True
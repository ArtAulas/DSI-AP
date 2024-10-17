from fastapi import APIRouter, Depends, Response
from db.db_item_pedido import ItemPedido, ItemPedidoRequest, ItemPedidoResponse
from sqlalchemy.orm import Session
from db_config import Base, engine, get_db
Base.metadata.create_all(bind=engine)

router=APIRouter(prefix='/itens_pedido')

@router.post("/inserir")#Create
def inserir(request:ItemPedidoRequest, db:Session=Depends(get_db)):
    rDici=request.model_dump()
    db.add(ItemPedido(**rDici))
    db.commit()
    return rDici

@router.get("/buscar")#Read
def buscar(db:Session=Depends(get_db)):
    itens=db.query(ItemPedido).all()
    return [ItemPedidoResponse.model_validate(item) for item in itens]

@router.get("/buscar/id/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    pedido=db.query(ItemPedido).filter(ItemPedido.id_item_pedido==id).first()
    if pedido is None:
        return Response(content='Item de Pedido não encontrado',status_code=404)
    return ItemPedidoResponse.model_validate(pedido)

@router.put("/atualizar/{id}")#Update
def atualizarId(id:int, request:ItemPedidoRequest, db:Session=Depends(get_db)):
    item_antigo=db.query(ItemPedido).filter(ItemPedido.id_item_pedido==id).first()
    if item_antigo is None:
        return Response(content='Item de Pedido não encontrado',status_code=404)
    db.merge(ItemPedido(id_item_pedido=id, **request.model_dump()))
    db.commit()
    item_novo=db.query(ItemPedido).filter(ItemPedido.id_item_pedido==id).first()
    return item_novo

@router.delete("/apagar/{id}")#Delete
def apagarId(id:int, db:Session=Depends(get_db)):
    item=db.query(ItemPedido).filter(ItemPedido.id_item_pedido==id).first()
    if item is None:
        return Response(content='Item de Pedido não encontrado',status_code=404)
    db.delete(item)
    db.commit()

@router.get("/buscar/id_pedido/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    itens_pedido=db.query(ItemPedido).filter(ItemPedido.id_pedido==id).all()
    return [ItemPedidoResponse.model_validate(item) for item in itens_pedido]

@router.get("/buscar/pedido_produto/{produto}/{pedido}")#Read
def buscarId(pedido:int,produto:int, db:Session=Depends(get_db)):
    itens_pedido=db.query(ItemPedido).filter(ItemPedido.id_pedido==pedido,ItemPedido.id_produto==produto).first()
    return itens_pedido
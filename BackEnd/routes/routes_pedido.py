from fastapi import APIRouter, Depends, Response
from db.db_pedido import Pedido, PedidoRequest, PedidoResponse, PedidoPatch
from db.db_restaurante import Restaurante
from sqlalchemy.orm import Session
from db_config import Base, engine, get_db
Base.metadata.create_all(bind=engine)

router=APIRouter(prefix='/pedidos')

@router.post("/inserir")#Create
def inserir(request:PedidoRequest, db:Session=Depends(get_db)):
    rDici=request.model_dump()
    db.add(Pedido(**rDici))
    db.commit()
    return rDici

@router.get("/buscar")#Read
def buscar(db:Session=Depends(get_db)):
    pedidos=db.query(Pedido).all()
    return [PedidoResponse.model_validate(pedido) for pedido in pedidos]

@router.get("/buscar/id/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    pedido=db.query(Pedido).filter(Pedido.id_pedido==id).first()
    if pedido is None:
        return Response(content='Pedido não encontrado',status_code=404)
    return PedidoResponse.model_validate(pedido)

@router.get("/buscar/id_restaurante/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    pedidos=db.query(Pedido).filter(Pedido.id_restaurante==id).all()
    return [PedidoResponse.model_validate(pedido) for pedido in pedidos]

@router.get("/buscar/id_user/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    pedidos=db.query(Pedido).filter(Pedido.id_usuario==id).all()
    return [PedidoResponse.model_validate(pedido) for pedido in pedidos]

@router.get("/buscar/id_user_status/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    pedido_aberto=db.query(Pedido).filter(Pedido.id_usuario==id, Pedido.status=='Aberto').first()
    return pedido_aberto

@router.get("/buscar/id_user_restaurante/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    pedidos=db.query(Pedido,Restaurante.nome_restaurante).filter(Pedido.id_usuario==id,Pedido.id_restaurante==Restaurante.id_restaurante).all()
    retorno=[]
    for pedido in pedidos:
        a=dict(PedidoResponse.model_validate(pedido[0]))
        a['nome_restaurante']=pedido[1]
        retorno.append(a)
    return retorno

@router.put("/atualizar/{id}")#Update
def atualizarId(id:int, request:PedidoRequest, db:Session=Depends(get_db)):
    pedido_antigo=db.query(Pedido).filter(Pedido.id_pedido==id).first()
    if pedido_antigo is None:
        return Response(content='Pedido não encontrado',status_code=404)
    db.merge(Pedido(id_pedido=id, **request.model_dump()))
    db.commit()
    pedido_novo=db.query(Pedido).filter(Pedido.id_pedido==id).first()
    return pedido_novo

@router.delete("/apagar/{id}")#Delete
def apagarId(id:int, db:Session=Depends(get_db)):
    pedido=db.query(Pedido).filter(Pedido.id_pedido==id).first()
    if pedido is None:
        return Response(content='Pedido não encontrado',status_code=404)
    db.delete(pedido)
    db.commit()

@router.patch("/status/{id}")
def patchStatus(id:int, request:PedidoPatch, db:Session=Depends(get_db)):
    pedido_antigo=db.query(Pedido).filter(Pedido.id_pedido==id).first()
    if pedido_antigo is None:
        return Response(content='Pedido não encontrado',status_code=404)
    pedido_antigo.status=dict(request)['status']
    db.merge(pedido_antigo)
    db.commit()

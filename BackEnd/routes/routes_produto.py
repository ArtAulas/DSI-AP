from fastapi import APIRouter, Depends, Response
from db.db_produto import Produto, ProdutoRequest, ProdutoResponse
from sqlalchemy.orm import Session
from db_config import Base, engine, get_db
Base.metadata.create_all(bind=engine)

router=APIRouter(prefix='/produtos')

@router.post("/inserir")#Create
def inserir(request:ProdutoRequest, db:Session=Depends(get_db)):
    rDici=request.model_dump()
    db.add(Produto(**rDici))
    db.commit()
    return rDici

@router.get("/buscar")#Read
def buscar(db:Session=Depends(get_db)):
    produtos=db.query(Produto).all()
    return [ProdutoResponse.model_validate(produto) for produto in produtos]

@router.get("/buscar/id/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    produto=db.query(Produto).filter(Produto.id_produto==id).first()
    if produto is None:
        return Response(content='Produto não encontrado',status_code=404)
    return ProdutoResponse.model_validate(produto)

@router.get("/buscar/id_restaurante/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    produtos=db.query(Produto).filter(Produto.id_restaurante==id).all()
    return [ProdutoResponse.model_validate(produto) for produto in produtos]

@router.put("/atualizar/{id}")#Update
def atualizarId(id:int, request:ProdutoRequest, db:Session=Depends(get_db)):
    produto_antigo=db.query(Produto).filter(Produto.id_produto==id).first()
    if produto_antigo is None:
        return Response(content='Produto não encontrado',status_code=404)
    db.merge(Produto(id_produto=id, **request.model_dump()))
    db.commit()
    produto_novo=db.query(Produto).filter(Produto.id_produto==id).first()
    return produto_novo

@router.delete("/apagar/{id}")#Delete
def apagarId(id:int, db:Session=Depends(get_db)):
    produto=db.query(Produto).filter(Produto.id_produto==id).first()
    if produto is None:
        return Response(content='Produto não encontrado',status_code=404)
    db.delete(produto)
    db.commit()
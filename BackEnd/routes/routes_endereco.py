from db.db_endereco import EnderecoRequest, EnderecoResponse, Endereco
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Response

from db_config import Base, engine, get_db
Base.metadata.create_all(bind=engine)

router=APIRouter(prefix='/endereco')

@router.get("/buscar")#Read
def buscarEndereco(db:Session=Depends(get_db)):
    endereco_on_db=db.query(Endereco).all()
    return [EnderecoResponse.model_validate(endereco_unico) for endereco_unico in endereco_on_db]

@router.post("/cadastrar")#Create
def inserir(request:EnderecoRequest, db:Session=Depends(get_db)):
    rDici=request.model_dump()
    db.add(Endereco(**rDici))
    db.commit()
    return rDici

@router.get("/buscar/id/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    endereco_on_db=db.query(Endereco).filter(Endereco.id_endereco==id).first()
    if endereco_on_db is None:
        return Response(content='Endereço não encontrado',status_code=404)
    return EnderecoResponse.model_validate(endereco_on_db)

@router.get("/buscar/id_user/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    endereco_on_db=db.query(Endereco).filter(Endereco.id_usuario==id).all()
    return [EnderecoResponse.model_validate(endereco_unico) for endereco_unico in endereco_on_db]

@router.put("/atualizar/{id}")#Update
def atualizarId(id:int, request:EnderecoRequest, db:Session=Depends(get_db)):
    endereco_antigo=db.query(Endereco).filter(Endereco.id_endereco==id).first()
    if endereco_antigo is None:
        return Response(content='Endereço não encontrado',status_code=404)
    db.merge(Endereco(id_endereco=id, **request.model_dump()))
    db.commit()
    endereco_novo=db.query(Endereco).filter(Endereco.id_endereco==id).first()
    return endereco_novo

@router.delete("/apagar/{id}")#Delete
def apagarId(id:int, db:Session=Depends(get_db)):
    endereco_on_db=db.query(Endereco).filter(Endereco.id_endereco==id).first()
    if endereco_on_db is None:
        return Response(content='Endereço não encontrado',status_code=404)
    db.delete(endereco_on_db)
    db.commit()
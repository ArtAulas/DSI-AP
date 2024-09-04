#CRUD- CREATE READ UPDATE DELETE
from fastapi import APIRouter, Depends, Response
from db_user import UsuarioRequest, UsuarioResponse, Usuario
from sqlalchemy.orm import Session
from datetime import datetime

from db_config import Base, engine, get_db
Base.metadata.create_all(bind=engine)

router=APIRouter(prefix='/usuarios')

@router.post("/inserir")#Create
def inserir(request:UsuarioRequest, db:Session=Depends(get_db)):
    rDici=request.model_dump()
    db.add(Usuario(**rDici))
    db.commit()
    return rDici

@router.get("/buscar")#Read
def buscar(db:Session=Depends(get_db)):
    usuarios_on_db=db.query(Usuario).all()
    return [UsuarioResponse.model_validate(usuario_unico) for usuario_unico in usuarios_on_db]

@router.get("/buscar/email/{email}")#Read
def buscarEmail(email:str, db:Session=Depends(get_db)):
    usuario_on_db=db.query(Usuario).filter(Usuario.email==email).first()
    if usuario_on_db is None:
        return Response(content='Usuário não encontrado',status_code=404)
    usuario_on_db.dt_confirm_email=datetime.now()
    db.merge(usuario_on_db)
    db.commit()
    return UsuarioResponse.model_validate(usuario_on_db)

@router.get("/buscar/id/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    usuario_on_db=db.query(Usuario).filter(Usuario.id==id).first()
    if usuario_on_db is None:
        return Response(content='Usuário não encontrado',status_code=404)
    return UsuarioResponse.model_validate(usuario_on_db)

@router.get("/buscar/telefone/{telefone}")#Read
def buscarTelefone(telefone:int, db:Session=Depends(get_db)):
    usuario_on_db=db.query(Usuario).filter(Usuario.telefone==telefone).first()
    if usuario_on_db is None:
        return Response(content='Usuário não encontrado',status_code=404)
    usuario_on_db.dt_confirm_telefone=datetime.now()
    db.merge(usuario_on_db)
    db.commit()
    return UsuarioResponse.model_validate(usuario_on_db)

@router.put("/atualizar/{id}")#Update
def atualizarId(id:int, request:UsuarioRequest, db:Session=Depends(get_db)):
    usuario_antigo=db.query(Usuario).filter(Usuario.id==id).first()
    if usuario_antigo is None:
        return Response(content='Usuário não encontrado',status_code=404)
    db.merge(Usuario(id=id, **request.model_dump()))
    db.commit()
    usuario_novo=db.query(Usuario).filter(Usuario.id==id).first()
    return usuario_novo

@router.delete("/apagar/{id}")#Delete
def apagarId(id:int, db:Session=Depends(get_db)):
    usuario_on_db=db.query(Usuario).filter(Usuario.id==id).first()
    if usuario_on_db is None:
        return Response(content='Usuário não encontrado',status_code=404)
    db.delete(usuario_on_db)
    db.commit()
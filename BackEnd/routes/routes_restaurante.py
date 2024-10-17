from fastapi import APIRouter, Depends, Response
from db.db_restaurante import Restaurante, RestauranteRequest, RestauranteResponse
from sqlalchemy.orm import Session
from db_config import Base, engine, get_db
Base.metadata.create_all(bind=engine)

router=APIRouter(prefix='/restaurantes')

@router.post("/inserir")#Create
def inserir(request:RestauranteRequest, db:Session=Depends(get_db)):
    rDici=request.model_dump()
    db.add(Restaurante(**rDici))
    db.commit()
    return rDici

@router.get("/buscar")#Read
def buscar(db:Session=Depends(get_db)):
    restaurantes=db.query(Restaurante).all()
    return [RestauranteResponse.model_validate(restaurante) for restaurante in restaurantes]

@router.get("/buscar/id/{id}")#Read
def buscarId(id:int, db:Session=Depends(get_db)):
    restaurante=db.query(Restaurante).filter(Restaurante.id_restaurante==id).first()
    if restaurante is None:
        return Response(content='Restaurante não encontrado',status_code=404)
    return RestauranteResponse.model_validate(restaurante)

@router.get("/buscar/cnpj/{cnpj}")#Read
def buscarCNPJ(cnpj:int, db:Session=Depends(get_db)):
    restaurante=db.query(Restaurante).filter(Restaurante.cnpj_restaurante==cnpj).first()
    if restaurante is None:
        return Response(content='Restaurante não encontrado',status_code=404)
    return RestauranteResponse.model_validate(restaurante)

@router.put("/atualizar/{id}")#Update
def atualizarId(id:int, request:RestauranteRequest, db:Session=Depends(get_db)):
    restaurante_antigo=db.query(Restaurante).filter(Restaurante.id_restaurante==id).first()
    if restaurante_antigo is None:
        return Response(content='Restaurante não encontrado',status_code=404)
    db.merge(Restaurante(id_restaurante=id, **request.model_dump()))
    db.commit()
    restaurante_novo=db.query(Restaurante).filter(Restaurante.id_restaurante==id).first()
    return restaurante_novo

@router.delete("/apagar/{id}")#Delete
def apagarId(id:int, db:Session=Depends(get_db)):
    restaurante=db.query(Restaurante).filter(Restaurante.id_restaurante==id).first()
    if restaurante is None:
        return Response(content='Restaurante não encontrado',status_code=404)
    db.delete(restaurante)
    db.commit()
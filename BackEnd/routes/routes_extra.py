from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from sqlalchemy import text
from db_config import Base, engine, get_db
from extras.criar_pdf import gerar_pdf
from extras.meu_email import mandar_email
Base.metadata.create_all(bind=engine)

router=APIRouter(prefix='/extras')

@router.get("/cupom/{id}")
def Cupom(id:int, db:Session=Depends(get_db)):
    q=text('''  
           select 	p.id_pedido, 
		    u.nome , u.sobrenome, u.cpf,
		    e.logradouro,e.numero,e.complemento,
		    r.nome_restaurante,r.cep_restaurante,r.cidade_restaurante,r.estado_restaurante,r.cnpj_restaurante,
		    ip.nome_produto,ip.quantidade_produto,ip.preco_produto, ip.quantidade_produto*ip.preco_produto as 'Total Item',
		    p.total_pedido,u.email 
            from 	pedido p join usuarios u on p.id_usuario=u.id
		            join endereco e on p.id_endereco=e.id_endereco
		            join restaurante r on p.id_restaurante=r.id_restaurante
		            join item_pedido ip on p.id_pedido=ip.id_pedido 
            where p.id_pedido=:idR''')
    dados=db.execute(q,{'idR':id}).all()
    if dados==[]:
        return Response(content='Pedido Inadequado',status_code=400)
    r=dados[0]
    dici={'id':r[0],
          'nome':r[1]+' '+r[2],'cpf':r[3],
          'endereco':r[4]+' '+str(r[5])+','+r[6],
          'restaurante':r[7],'cep_rest':r[8],'local_rest':r[9]+','+r[10],'cnpj':r[11],
          'itens':[],'total':r[16]}
    
    for d in dados:
        v={'produto':d[12],'qtd':d[13],'preco_uni':d[14],'total_item':d[15]}
        dici['itens'].append(v)

    gerar_pdf(dici,'cupom_fiscal.pdf')
    mandar_email(r[17])
    return dici
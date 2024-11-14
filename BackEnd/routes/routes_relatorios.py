from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from sqlalchemy import func, text
from db_config import Base, engine, get_db
from db.db_item_pedido import ItemPedido
from db.db_produto import Produto
from db.db_restaurante import Restaurante
from db.db_pedido import Pedido
Base.metadata.create_all(bind=engine)

router=APIRouter(prefix='/relatorios')

@router.get("/relatorio1/sem_data")#Read
def relatorio1(db:Session=Depends(get_db)):
    dados=db.query(Produto.nome_produto,Restaurante.nome_restaurante,ItemPedido.preco_produto,func.sum(ItemPedido.quantidade_produto),func.sum(ItemPedido.preco_produto*ItemPedido.quantidade_produto),Produto.categoria_produto).select_from(Produto).join(ItemPedido,Produto.id_produto==ItemPedido.id_produto).join(Restaurante, Produto.id_restaurante==Restaurante.id_restaurante).join(Pedido,Pedido.id_pedido==ItemPedido.id_pedido).filter(Pedido.data_e_hora_pedido!='').group_by(Produto.id_produto).order_by(func.sum(ItemPedido.preco_produto*ItemPedido.quantidade_produto).desc()).all()
    l=[]
    for item in dados:
        l.append({
            'Nome':item[0],
            'Preco_Unitario':item[2],
            'Quantidade_Total':item[3],
            'Faturamento_Total':item[4],
            'Restaurante':item[1],
            'Categoria':item[5]
        })
    return l

@router.get("/relatorio1/com_data/{dia}")#Read
def relatorio1_1(dia:str,db:Session=Depends(get_db)):
    dados=db.query(Produto.nome_produto,Restaurante.nome_restaurante,ItemPedido.preco_produto,func.sum(ItemPedido.quantidade_produto),func.sum(ItemPedido.preco_produto*ItemPedido.quantidade_produto),Produto.categoria_produto).select_from(Produto).join(ItemPedido,Produto.id_produto==ItemPedido.id_produto).join(Restaurante, Produto.id_restaurante==Restaurante.id_restaurante).join(Pedido, Pedido.id_pedido==ItemPedido.id_pedido).filter(Pedido.data_e_hora_pedido==dia).group_by(Produto.id_produto).order_by(func.sum(ItemPedido.preco_produto*ItemPedido.quantidade_produto).desc()).all()
    l=[]
    for item in dados:
        l.append({
            'Nome':item[0],
            'Preco_Unitario':item[2],
            'Quantidade_Total':item[3],
            'Faturamento_Total':item[4],
            'Restaurante':item[1],
            'Categoria':item[5]
        })
    return l

@router.get("/relatorio1/com_periodo/{diaI}/{diaF}")#Read
def relatorio1_2(diaI:str,diaF:str,db:Session=Depends(get_db)):
    dados=db.query(Produto.nome_produto,Restaurante.nome_restaurante,ItemPedido.preco_produto,func.sum(ItemPedido.quantidade_produto),func.sum(ItemPedido.preco_produto*ItemPedido.quantidade_produto),Produto.categoria_produto).select_from(Produto).join(ItemPedido,Produto.id_produto==ItemPedido.id_produto).join(Restaurante, Produto.id_restaurante==Restaurante.id_restaurante).join(Pedido, Pedido.id_pedido==ItemPedido.id_pedido).filter(Pedido.data_e_hora_pedido>=diaI,Pedido.data_e_hora_pedido<=diaF,Pedido.data_e_hora_pedido!='').group_by(Produto.id_produto).order_by(func.sum(ItemPedido.preco_produto*ItemPedido.quantidade_produto).desc()).all()
    l=[]
    for item in dados:
        l.append({
            'Nome':item[0],
            'Preco_Unitario':item[2],
            'Quantidade_Total':item[3],
            'Faturamento_Total':item[4],
            'Restaurante':item[1],
            'Categoria':item[5]
        })
    return l

@router.get("/relatorio1/restaurante/{idRest}")#Read
def relatorio1_3(idRest:int,db:Session=Depends(get_db)):
    dados=db.query(Produto.nome_produto,Restaurante.nome_restaurante,ItemPedido.preco_produto,func.sum(ItemPedido.quantidade_produto),func.sum(ItemPedido.preco_produto*ItemPedido.quantidade_produto),Produto.categoria_produto).select_from(Produto).join(ItemPedido,Produto.id_produto==ItemPedido.id_produto).join(Restaurante, Produto.id_restaurante==Restaurante.id_restaurante).join(Pedido, Pedido.id_pedido==ItemPedido.id_pedido).filter(Pedido.id_restaurante==idRest,Pedido.data_e_hora_pedido!='').group_by(Produto.id_produto).order_by(func.sum(ItemPedido.preco_produto*ItemPedido.quantidade_produto).desc()).all()
    l=[]
    for item in dados:
        l.append({
            'Nome':item[0],
            'Preco_Unitario':item[2],
            'Quantidade_Total':item[3],
            'Faturamento_Total':item[4],
            'Restaurante':item[1],
            'Categoria':item[5]
        })
    return l

@router.get("/relatorio2/sem_filtro")
def relatorio2(db:Session=Depends(get_db)):
    q=text('''  select sum(total_pedido), data_e_hora_pedido 
                from pedido
                where data_e_hora_pedido<>'' and id_restaurante<>0
                group by data_e_hora_pedido
                order by data_e_hora_pedido asc''')
    dados=db.execute(q).all()
    l=[{'dia':dado[1],'faturamento':dado[0]} for dado in dados]
    return l

@router.get("/relatorio2/restaurante/{id}")
def relatorio2_R(id:int, db:Session=Depends(get_db)):
    q=text('''  select sum(total_pedido), data_e_hora_pedido 
                from pedido
                where data_e_hora_pedido<>'' and id_restaurante<>0
		        and id_restaurante=:idR
                group by data_e_hora_pedido
                order by data_e_hora_pedido asc''')
    dados=db.execute(q,{'idR':id}).all()
    l=[{'dia':dado[1],'faturamento':dado[0]} for dado in dados]
    return l

@router.get("/relatorio2/periodo/{diaI}/{diaF}")
def relatorio2_P(diaI:str,diaF:str, db:Session=Depends(get_db)):
    q=text('''  select sum(total_pedido), data_e_hora_pedido 
                from pedido
                where 	data_e_hora_pedido<>'' and id_restaurante<>0
		                and data_e_hora_pedido BETWEEN :inicio and :fim
                group by data_e_hora_pedido
                order by data_e_hora_pedido asc''')
    dados=db.execute(q,{'inicio':diaI,'fim':diaF}).all()
    l=[{'dia':dado[1],'faturamento':dado[0]} for dado in dados]
    return l

@router.get("/relatorio3/sem_filtro")
def relatorio3(db:Session=Depends(get_db)):
    q=text('''  select sum(ip.quantidade_produto) 'Quantidade Vendida',r.nome_restaurante 'Restaurante'
                from pedido p   join restaurante r on p.id_restaurante=r.id_restaurante
				                join item_pedido ip on p.id_pedido=ip.id_pedido
                where data_e_hora_pedido<>''
                group by r.id_restaurante
                order by 'Quantidade Vendida' asc''')
    dados=db.execute(q).all()
    l=[{'restaurante':dado[1],'qtd_vendida':dado[0]} for dado in dados]
    return l

@router.get("/relatorio3/periodo/{diaI}/{diaF}")
def relatorio3_P(diaI:str,diaF:str,db:Session=Depends(get_db)):
    q=text('''  select sum(ip.quantidade_produto) 'Quantidade Vendida',r.nome_restaurante 'Restaurante'
                from pedido p   join restaurante r on p.id_restaurante=r.id_restaurante
				                join item_pedido ip on p.id_pedido=ip.id_pedido
                where data_e_hora_pedido<>'' and data_e_hora_pedido BETWEEN :inicio and :fim
                group by r.id_restaurante
                order by 'Quantidade Vendida' asc''')
    dados=db.execute(q,{'inicio':diaI,'fim':diaF}).all()
    l=[{'restaurante':dado[1],'qtd_vendida':dado[0]} for dado in dados]
    return l

@router.get("/relatorio3/data/{dia}")
def relatorio3_P(dia:str,db:Session=Depends(get_db)):
    q=text('''  select sum(ip.quantidade_produto) 'Quantidade Vendida',r.nome_restaurante 'Restaurante'
                from pedido p   join restaurante r on p.id_restaurante=r.id_restaurante
				                join item_pedido ip on p.id_pedido=ip.id_pedido
                where data_e_hora_pedido<>'' and data_e_hora_pedido=:diaP
                group by r.id_restaurante
                order by 'Quantidade Vendida' asc''')
    dados=db.execute(q,{'diaP':dia}).all()
    l=[{'restaurante':dado[1],'qtd_vendida':dado[0]} for dado in dados]
    return l

@router.get("/relatorio3/especialidade/{espec}")
def relatorio3_P(espec:str,db:Session=Depends(get_db)):
    q=text('''  select sum(ip.quantidade_produto) 'Quantidade Vendida',r.nome_restaurante 'Restaurante'
                from pedido p   join restaurante r on p.id_restaurante=r.id_restaurante
				                join item_pedido ip on p.id_pedido=ip.id_pedido
                where data_e_hora_pedido<>'' and r.especialidade_restaurante=:especR
                group by r.id_restaurante
                order by 'Quantidade Vendida' asc''')
    dados=db.execute(q,{'especR':espec}).all()
    l=[{'restaurante':dado[1],'qtd_vendida':dado[0]} for dado in dados]
    return l
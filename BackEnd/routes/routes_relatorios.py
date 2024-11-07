from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from sqlalchemy import func
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

'''
select 	p.nome_produto,r.nome_restaurante ,
		ip.preco_produto,
		sum(ip.quantidade_produto) as 'Total Produtos',
		sum(ip.preco_produto*quantidade_produto) as 'Preço Total'
from 	produto p
		join item_pedido ip
		join restaurante r
		join pedido p2
where 	p.id_produto=ip.id_produto 
		and p.id_restaurante=r.id_restaurante
		and ip.id_pedido=p2.id_pedido
group by p.id_produto
order by 'Preço Total' asc
'''
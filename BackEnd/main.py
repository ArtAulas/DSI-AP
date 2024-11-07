from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes_usuario import router as usuario
from routes.routes_endereco import router as endereco
from routes.routes_restaurante import router as restaurante
from routes.routes_produto import router as produto
from routes.routes_pedido import router as pedidos
from routes.routes_item_pedido import router as item_pedido
from routes.routes_relatorios import router as relatorios
app=FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/helloworld")
def helloworld():
    return 'Hello World'

app.include_router(usuario)
app.include_router(endereco)
app.include_router(restaurante)
app.include_router(produto)
app.include_router(pedidos)
app.include_router(item_pedido)
app.include_router(relatorios)

if __name__=='__main__':
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8003, reload=True)
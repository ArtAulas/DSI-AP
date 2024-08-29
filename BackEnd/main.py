from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes_usuario import router as router1

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

app.include_router(router1)

if __name__=='__main__':
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8003, reload=True)
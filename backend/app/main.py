from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "FastAPI is running!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}

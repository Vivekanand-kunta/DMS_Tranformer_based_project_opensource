from fastapi import FastAPI, HTTPException,Depends,Body
import psycopg
import os
from fastapi.middleware.cors import CORSMiddleware
from backend.app.database.database_connection_check import database_connection_check
from backend.app.database.fetch_database_schema import get_full_schema
import random
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"message": "Welcome to the Transformer Based DBMS Management System!"}
    
@app.get("/api/postgres")
async def postgres_check(uri:str): 
    try:
        with psycopg.connect(uri) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT version();")
                version = cur.fetchone()
                database_key=uri
                return {"message": "Postgres URI is valid", "version": version[0]}
    except psycopg.OperationalError as e:
        raise HTTPException(status_code=400, detail=f"Postgres URI is invalid: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/api/postgres/schema")
async def postgres_schema(uri=Depends(database_connection_check)):
    result=[]
    try:
        res=get_full_schema(uri)
        return {"message": "Schema fetched successfully","schema":res}
                
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while fetching schema: {str(e)}")

@app.post('/api/postgres/query')
async def query(payload:dict=Body(...)):
    example_chat_data = {
        "chat_id": random.randint(0,100000000),
        "chat_query": "Yeah i am showing you the results",
        "chat_table_present": "True",
        "chat_table": {
            "users": {
                "headers": ["id", "first_name", "last_name", "email"],
                "rows": [
                    [1, "John", "Doe", "john.doe@example.com"],
                    [2, "Jane", "Smith", "jane.smith@example.com"],
                    [3, "Alice", "Johnson", "alice.johnson@example.com"],
                ],
            },
            "orders": {
                "headers": ["order_id", "user_id", "product", "amount"],
                "rows": [
                    [101, 1, "Laptop", 1200],
                    [102, 2, "Headphones", 200],
                    [103, 1, "Keyboard", 80],
                ],
            },
        },
    }
    print(f"paylaod : {payload}")
    return {"chat":example_chat_data}
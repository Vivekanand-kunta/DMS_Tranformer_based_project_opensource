from fastapi import FastAPI, HTTPException,Depends
import psycopg
import os
from fastapi.middleware.cors import CORSMiddleware
from backend.app.database.database_connection_check import database_connection_check
from backend.app.database.fetch_database_schema import get_full_schema

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


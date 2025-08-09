from fastapi import FastAPI, HTTPException
import psycopg
import os
import openai 
from openai import OpenAIError, AuthenticationError, RateLimitError, APIError, APIConnectionError, BadRequestError
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","*"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key=None 
database_key=None 

@app.get("/")
async def credentials():
    return {"message": "Welcome to the Transformer Based DBMS Management System!"}

@app.get("/ping")
async def ping():
    return {"status": "ok"}
    
    




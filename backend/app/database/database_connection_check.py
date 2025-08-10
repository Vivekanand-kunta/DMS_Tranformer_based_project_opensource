import psycopg
from fastapi import HTTPException,Query


def database_connection_check(uri:str=Query(...)):
    if uri is None:
        raise HTTPException(status_code=400, detail="Postgres URI is required")

    try:
        with psycopg.connect(uri) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT version();")
                version = cur.fetchone()
                return uri
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Postgres URI is invalid: {str(e)}")

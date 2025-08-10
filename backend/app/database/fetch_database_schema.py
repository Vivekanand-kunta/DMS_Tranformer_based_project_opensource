import psycopg

def get_full_schema(uri):
    schema = {}

    with psycopg.connect(uri) as conn:
        with conn.cursor() as cur:
            # Tables in Schema
            cur.execute("""
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
            """)
            tables = [row[0] for row in cur.fetchall()]
            schema['tables'] = {}

            #Columns in Table
            for table in tables:
                table_info = {}
                cur.execute("""
                    SELECT column_name, data_type, is_nullable
                    FROM information_schema.columns
                    WHERE table_schema = 'public' AND table_name = %s
                    ORDER BY ordinal_position;
                """, (table,))
                columns = cur.fetchall()
                table_info['columns'] = [{
                    'column_name': col,
                    'data_type': dtype,
                    'is_nullable': (nullable == 'YES')
                } for col, dtype, nullable in columns]

                #Primary keys 
                cur.execute("""
                    SELECT kcu.column_name
                    FROM information_schema.table_constraints tc
                    JOIN information_schema.key_column_usage kcu 
                      ON tc.constraint_name = kcu.constraint_name
                    WHERE tc.constraint_type = 'PRIMARY KEY' AND tc.table_name = %s;
                """, (table,))
                pks = [row[0] for row in cur.fetchall()]
                table_info['primary_keys'] = pks

                # Foreign keys 
                cur.execute("""
                    SELECT 
                      kcu.column_name,
                      ccu.table_name AS foreign_table_name,
                      ccu.column_name AS foreign_column_name
                    FROM information_schema.table_constraints AS tc
                    JOIN information_schema.key_column_usage AS kcu
                      ON tc.constraint_name = kcu.constraint_name
                    JOIN information_schema.constraint_column_usage AS ccu
                      ON ccu.constraint_name = tc.constraint_name
                    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = %s;
                """, (table,))
                fks = [{
                    'column': row[0],
                    'foreign_table': row[1],
                    'foreign_column': row[2]
                } for row in cur.fetchall()]
                table_info['foreign_keys'] = fks


                schema['tables'][table] = table_info

    return schema

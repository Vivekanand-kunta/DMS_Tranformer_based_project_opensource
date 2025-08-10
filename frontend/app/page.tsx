'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SchemaTables from "@/components/FunctionalComponents/SchemaTables";

interface Column {
  column_name: string;
  data_type: string;
  is_nullable: boolean;
}

interface ForeignKey {
  column: string;
  foreign_table: string;
  foreign_column: string;
}

interface Index {
  index_name: string;
  columns: string[];
  is_unique: boolean;
}

interface TableSchema {
  columns: Column[];
  primary_keys: string[];
  foreign_keys: ForeignKey[];
  unique_columns: string[];
  indexes: Record<string, Index>;
}

interface DatabaseSchema {
  tables: Record<string, TableSchema>;
}

export default function Page() {
  const defaultURI = ""; // put your default URI here
  const [postgresURI, setPostgresURI] = useState<string>(defaultURI);
  const [schema, setSchema] = useState<DatabaseSchema | null>(null);
  const [showSchema, setShowSchema] = useState<boolean>(false);
  const credentials_verification = async (uri: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/postgres?uri=${encodeURIComponent(uri)}`);
      const data = await response.json();
      console.log("Postgres Response:", data.message);
    } catch (error) {
      alert(`Error in fetching: ${error}`);
    }
  };

  const view_schema = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/postgres/schema?uri=${encodeURIComponent(postgresURI)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSchema(data.schema);
    } catch (error) {
      console.error("Error fetching schema:", error);
      alert(`Error fetching schema: ${error}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="w-full flex justify-center">
        <Input
          type="text"
          placeholder="PostgreSQL URI"
          className="w-[70vw] h-[3rem]"
          value={postgresURI}
          onChange={(e) => setPostgresURI(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => credentials_verification(postgresURI)}
          type="button"
          variant="outline"
          className="w-[10vw] h-[3rem] bg-green-400 hover:bg-green-500"
        >
          Connect
        </Button>
        <Button
          onClick={()=>{view_schema();setShowSchema(!showSchema);}}
          type="button"
          variant="outline"
          className="w-[10vw] h-[3rem]"
        >
          View Schema
        </Button>
      </div>

      {showSchema && schema && (
        <div
          className="
            mt-8 
            w-[80vw] 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6
          "
          style={{ gridAutoColumns: 'minmax(150px, auto)' }}
        >
          {Object.entries(schema.tables).map(([tableName, tableSchema]) => (
            <div key={tableName} style={{ minWidth: 150 }}>
              <SchemaTables tableName={tableName} tableSchema={tableSchema} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

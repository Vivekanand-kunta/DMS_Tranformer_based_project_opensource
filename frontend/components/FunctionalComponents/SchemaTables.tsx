import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface TableSchema {
  columns: Column[];
  primary_keys: string[];
  foreign_keys: ForeignKey[];
}

interface Props {
  tableName: string;
  tableSchema: TableSchema;
}

const SchemaTables: React.FC<Props> = ({ tableName, tableSchema }) => {
  const primaryKeysString = tableSchema.primary_keys.length
    ? tableSchema.primary_keys.join(", ")
    : "None";

  const foreignKeysString = tableSchema.foreign_keys.length
    ? tableSchema.foreign_keys
        .map((fk) => `${fk.foreign_table}(${fk.foreign_column})`)
        .join(", ")
    : "None";

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{tableName} Schema</h2>

      {/* Main Columns Table with header and border */}
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="border border-gray-300">Column Name</TableHead>
            <TableHead className="border border-gray-300">Data Type</TableHead>
            <TableHead className="border border-gray-300">Nullable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableSchema.columns.map((col) => (
            <TableRow key={col.column_name}>
              <TableCell className="border border-gray-300">{col.column_name}</TableCell>
              <TableCell className="border border-gray-300">{col.data_type}</TableCell>
              <TableCell className="border border-gray-300">{col.is_nullable ? "YES" : "NO"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Summary Table without header but with border */}
      <Table className="border border-gray-300 mt-6">
        <TableBody>
          <TableRow>
            <TableCell className="border border-gray-300 font-semibold">Primary Key</TableCell>
            <TableCell className="border border-gray-300">{primaryKeysString}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-300 font-semibold">Foreign Key</TableCell>
            <TableCell className="border border-gray-300">{foreignKeysString}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SchemaTables;

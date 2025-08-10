import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableData = {
  headers: string[];
  rows: (number | string | null)[][];
};

const SingleTable = ({ Data, TableName }: { Data: TableData; TableName: string }) => {
  return (
    <div className="mb-6">
      <h3 className="font-bold mb-2">{TableName}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            {Data.headers.map((header, index) => (
              <TableHead key={index} className="border-b border-gray-300">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Data.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="font-medium border-b border-gray-300">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleTable;

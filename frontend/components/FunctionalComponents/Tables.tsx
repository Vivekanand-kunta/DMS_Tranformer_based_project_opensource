import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  
  type ChatData = {
    id: number;
    query: string;
    result: string;
  };

  const Tables = ({ chatData }: { chatData: ChatData[] }) => {
    return (
      <Table>
        <TableCaption>Recent Chat Queries and Responses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border-b border-gray-300">ID</TableHead>
            <TableHead className="border-b border-gray-300">Query</TableHead>
            <TableHead className="border-b border-gray-300">Response</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chatData.map((chat) => (
            <TableRow key={chat.id}>
              <TableCell className="font-medium border-b border-gray-300">{chat.id}</TableCell>
              <TableCell className="border-b border-gray-300">{chat.query}</TableCell>
              <TableCell className="border-b border-gray-300">{chat.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default Tables;
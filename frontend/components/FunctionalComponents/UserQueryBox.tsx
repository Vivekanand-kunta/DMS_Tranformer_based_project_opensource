type CellValue = string | number | null;

interface TableData {
  headers: string[];
  rows: CellValue[][];
}

interface ChatData {
  chat_id: number;
  chat_class: string;
  chat_query: string;
  chat_table_present: boolean;
  chat_table: Record<string, TableData>;
}

interface TablesProps {
  chatData: ChatData;
}
const UserQueryBox: React.FC<TablesProps> = ({chatData}) => {
  return (
    <div className="query" id={chatData.chat_id.toString()}>
        <p>{chatData.chat_query}</p>
    </div>
  )
}

export default UserQueryBox

import UserQueryBox from "./UserQueryBox";
import ChatTables from "./ChatTables";
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



const Chat: React.FC<TablesProps> = ({ chatData }) => {
  return (
    <>
      {chatData.chat_class === "query" ? (
        <UserQueryBox key={chatData.chat_id}  chatData={chatData} />
      ) : (
        <ChatTables key={chatData.chat_id} chatData={chatData} />
      )}
    </>
  )
}

export default Chat

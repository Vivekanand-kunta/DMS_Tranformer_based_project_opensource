import React from 'react'
import SingleTable from './SingleTable';
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

const ChatTables:React.FC<TablesProps> = ({chatData}) => {
  return (
    <div className='result table-container'>
       <p>{chatData.chat_query}</p>
      {chatData.chat_table_present ?
       (Object.entries(chatData.chat_table).map(([tableName, tableData]) => (
        <SingleTable key={tableName} Data={tableData} TableName={tableName} />
      ))) 
      :(<></>)}
    </div>
  )
}

export default ChatTables

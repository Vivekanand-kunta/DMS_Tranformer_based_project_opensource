'use client';
import Tables from '@/components/FunctionalComponents/SingleTable';
import Search from '@/components/FunctionalComponents/Search';
import {useState} from 'react';
import Chat from '@/components/FunctionalComponents/Chat';
type CellValue = string | number | null;

interface TableData {
  headers: string[];
  rows: CellValue[][];
}

interface chatData {
  chat_id: number;
  chat_class:string;
  chat_query: string;
  chat_table_present: boolean;
  chat_table: Record<string, TableData>;
}



export default function Home() {

  const [chat_id, setChatId] = useState<number>(0);
  const [chats,setChats]=useState<chatData[]>([]);
  
  
  return (
    <main className="w-[100%] h-[100%] flex  justify-center">
      <div className="chat glass-card mb-30 min-h-[80vh]">
      {chats.map((chat)=>(<Chat key={chat.chat_id} chatData={chat} />))}
      </div>

    <Search setChat={setChats} />
    </main>
  );
}

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

interface SearchProps {
  setChat: Dispatch<SetStateAction<ChatData[]>>;
}

const Search: React.FC<SearchProps> = ({ setChat }) => {
  const [input, setInput] = useState("");

  const backend_query=async (query:string)=>{

    const response=await fetch(`http://localhost:8000/api/postgres/query`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        {query}
      )
    },)

    const res=await response.json()
    const newId = Math.floor(Math.random() * 1000000)
    setChat((prev) => [
      ...prev,
      {
        chat_id: res.chat.chat_id,
        chat_class: "result table-container",
        chat_query: res.chat.chat_query,
        chat_table_present: res.chat.chat_table_present,
        chat_table: res.chat.chat_table,
      },
    ]);

    console.log("New chat added:", {
      chat_id: res.chat.chat_id,
        chat_class: "result table-container",
        chat_query: res.chat.chat_query,
        chat_table_present: res.chat.chat_table_present,
        chat_table: res.chat.chat_table,
    });


  }
  const handleSend = async() => {
    if (!input.trim()) return;

    const newId = Math.floor(Math.random() * 1000000);

    setChat((prev) => [
      ...prev,
      {
        chat_id: newId,
        chat_class: "query",
        chat_query: input,
        chat_table_present: false,
        chat_table: {},
      },
    ]);
    await backend_query(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 rounded-2xl w-[max(70vw,100px)] h-[10vh] bg-white p-4 shadow-lg z-10 flex">
      <div className="Text w-[90%]">
        <Textarea
          placeholder="Enter the query"
          className="resize-none overflow-auto max-h-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); 
              handleSend();
            }
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row w-[10%] rounded-3xl pl-4 pt-3">
        <Button onClick={handleSend} >Send</Button>
      </div>
    </div>
  );
};

export default Search;

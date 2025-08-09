import Tables from '@/components/FunctionalComponents/Tables';
import Search from '@/components/FunctionalComponents/Search';
export default function Home() {


  const chatData = [
    { id: 1, query: "Hello can you give the results from my database", result: "Yes these are the results from the database" },
    { id: 2, query: "Hello can you give the results from my database", result: "Yes these are the results from the database" },
    { id: 3, query: "Hello can you give the results from my database", result: "Nope" },
    { id: 4, query: "New Query 2", result: "Awaiting response" },
    { id: 5, query: "Hello can you give the results from my database", result: "Yes these are the results from the database" },
    { id: 6, query: "Hello can you give the results from my database", result: "Yes these are the results from the database" },
    { id: 7, query: "Hello can you give the results from my database", result: "Nope" },
    { id: 8, query: "New Query 2", result: "Awaiting response" },
    
  ];

  return (
    <main className="w-[100%] h-[100%] flex  justify-center">
      <div className="chat glass-card mb-30">
        <div className="query"><p>Server, can you confirm if the UI dashboard is rendering correctly?</p></div>
        <div className="result table-container"><Tables chatData={chatData}/> </div> 
        <div className="query"><p>Server, can you confirm if the UI dashboard is rendering correctly?</p></div>
        <div className="result table-container"><Tables chatData={chatData}/> </div> 
        <div className="result table-container"><Tables chatData={chatData}/> </div> 
        <div className="result table-container"><Tables chatData={chatData}/> </div> 
        <div className="query"><p>Server, can you confirm if the UI dashboard is rendering correctly?</p></div>
        <div className="result table-container"><Tables chatData={chatData}/> </div> 
      </div>

    <Search />
    </main>
  );
}

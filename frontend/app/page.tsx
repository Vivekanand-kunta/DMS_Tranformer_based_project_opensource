'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { error } from "console";

export default function Page() {

  const credentials_verification = async () => {
    try {
      const response = await fetch(`http://localhost:8000/`);

      if (response.ok) {
        const errorData = await response.json();
        alert(`${errorData.message}`);
        alert("Credentials verified successfully!");
      } else {
        alert("Credentials verified successfully!");
        
        console.log("Credentials verified successfully!");
      }
    } catch (error) {
      alert("Network or unexpected error: " + error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="w-full flex justify-center">
        <Input
          type="text"
          placeholder="PostgreSQL URI"
          className="w-[70vw] h-[3rem]"
        />
      </div>

      <div className="w-full flex justify-center">
        <Input
          type="text"
          placeholder="OPENAI API Key"
          className="w-[70vw] h-[3rem]"
        />
      </div>

      <div className="flex gap-4 ">
        <Button
          onClick={() => credentials_verification()}
          type="submit"
          variant="outline"
          className="w-[10vw] h-[3rem] bg-green-400 hover:bg-green-500"
        >
          Connect
        </Button>
        <Button type="submit" variant="outline" className="w-[10vw] h-[3rem]">
          View Schema
        </Button>
      </div>
    </div>
  );
}

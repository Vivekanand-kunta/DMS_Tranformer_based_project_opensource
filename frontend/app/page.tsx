import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      
      <div className="w-full flex justify-center">
        <Input
          type="email"
          placeholder="PostgreSQL URI"
          className="w-[70vw] h-[3rem]"
        />
      </div>

      <div className="flex gap-4 ">
        <Button type="submit" variant="outline" className="w-[10vw] h-[3rem] bg-green-400 :hover:bg-green-500">
          Connect
        </Button>
        <Button type="submit" variant="outline" className="w-[10vw] h-[3rem]">
          View Schema
        </Button>
      </div>


    </div>
  )
}

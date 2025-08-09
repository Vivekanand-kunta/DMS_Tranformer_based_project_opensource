import { Button } from "@/components/ui/button"
import { Textarea} from "@/components/ui/textarea"

const Search = () => {
    return (
      <div className="fixed bottom-5 rounded-2xl w-[max(70vw,100px)] h-[10vh] bg-white p-4 shadow-lg z-10 flex">
        <div className="Text w-[90%]">
         <Textarea placeholder="Enter the query"  className="resize-none overflow-auto max-h-3" />
        </div>
        <div className="flex flex-wrap items-center gap-2 md:flex-row w-[10%] rounded-3xl pl-4 pt-3">
        <Button>Send</Button>
        </div>
      </div>
    )
  }
  
  export default Search
  
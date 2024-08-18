import { Link2, Plus } from "lucide-react";
import Button from "../../components/button";

export function ImportantsLinks() {
  return (
    <div className=" flex flex-col space-y-6 ">
      <h2 className="font-bold text-zinc-50 font-sans text-lg">Links importantes</h2>
      <div className="flex justify-center items-center gap-3">
        <div className=" space-y-1.5">
          <span className="text-zinc-100 text-medium block">Reservar Airbnb</span>
          <span className="text-zinc-400 text-sm block truncate">https://www.airbnb.com.br/rooms/104700011</span>
        </div>
        <Link2 className="size-5 text-zinc-400" />
      </div>
      <div className="flex justify-center items-center gap-3">
        <div className=" space-y-1.5">
          <span className="text-zinc-100 text-medium block">Reservar Airbnb</span>
          <span className="text-zinc-400 text-sm block truncate">https://www.airbnb.com.br/rooms/104700011</span>
        </div>
        <Link2 className="size-5 text-zinc-400" />
      </div>
      <Button variants="secondary"><Plus /> Cadastrar novo link</Button>
    </div>
  )
}
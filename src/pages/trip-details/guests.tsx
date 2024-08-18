import { CircleDashed, CheckCircle2, UserCog } from "lucide-react";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

interface Participants {
  id: string,
  name: string,
  email: string,
  is_confirmed: boolean,
}

export default function Guests() {
  
  const [participants, setParticipants] = useState<Participants[]>([])
  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(reponse => setParticipants(reponse.data.participants))
  }, [tripId])

  return (<div className=" flex flex-col space-y-6">
    <h2 className="font-bold text-zinc-50 font-sans text-lg">Convidados</h2>

    {participants.map((participants,index) => {
      return (
      <div key={index} className="flex justify-center">
        <div className="w-full">
          <h3 className="text-zinc-100 ">{participants.name?? `Convidado ${index+1}`}</h3>
          <span className="text-zinc-400 text-sm">{participants.email}</span>
        </div>

        {participants.is_confirmed ? <CheckCircle2 className="size-5 text-lime-300 shrink-0" /> : <CircleDashed className="size-5 text-zinc-400 shrink-0" />}
        
      </div>
      )
    })}
    <Button variants="secondary"><UserCog /> Gerenciar convidados</Button>
  </div>)
}


import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  date: string,
  activities: {
    id: string,
    title: string,
    occurs_at: string
  }[]
}

export default function Activities() {

  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(reponse => setActivities(reponse.data.activities))
  }, [tripId])

  return (
    <div className="flex flex-col space-y-8">
      {/* <div>
        <div className="flex gap-2 items-end"><span className="text-zinc-300 font-bold">Dia 17</span><span className="text-zinc-500  text-xs">Sábado</span></div>
        <div>Nenhuma atividade cadastrada nessa data.</div>
      </div> */}

      {activities?.map((category, index) => {
        return (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex gap-2 items-end"><span className="text-zinc-300 font-bold text-lg">Dia {format(category.date, 'd')}</span> <span className="text-zinc-500 text-xs">{format(category.date, 'EEEE', { locale: ptBR })}</span></div>
            {category.activities.length > 0 ?
              (category.activities.map((activity) => {
                return (
                  <div key={activity.id} className="flex justify-between rounded-md px-4 py-3 bg-zinc-900 shadow-shape">
                    <div className="flex gap-3 text-zinc-400"><CheckCircle2 className='size-5 text-lime-300' />{activity.title}</div>
                    <span className="text-zinc-400">{format(activity.occurs_at, "kk':'mm'h'", { locale: ptBR })}</span>
                  </div>
                )
              })) : (<div>Nenhuma atividade cadastrada nessa data.</div>)}
          </div>)
      })}


      {/* <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-end"><span className="text-zinc-300 font-bold text-lg">Dia 18</span> <span className="text-zinc-500 text-xs">Domingo</span></div>
        <div className="flex justify-between rounded-md px-4 py-3 bg-zinc-900 shadow-shape">
          <div className="flex gap-3 text-zinc-400"><CheckCircle2 className='size-5 text-lime-300' />Corrida de Kart</div>
          <span className="text-zinc-400">14:00h</span>
        </div>
        <div className="flex justify-between rounded-md px-4 py-3 bg-zinc-900 shadow-shape">
          <div className="flex gap-3 text-zinc-400"><CheckCircle2 className='size-5 text-lime-300' />Corrida de Kart</div>
          <span className="text-zinc-400">14:00h</span>
        </div>
        <div className="flex justify-between rounded-md px-4 py-3 bg-zinc-900 shadow-shape">
          <div className="flex gap-3 text-zinc-400"><CheckCircle2 className='size-5 text-lime-300' />Corrida de Kart</div>
          <span className="text-zinc-400">14:00h</span>
        </div>

        <div className="flex justify-between rounded-md px-4 py-3 bg-zinc-900 shadow-shape">
          <div className="flex gap-3 text-zinc-400"><CheckCircle2 className='size-5 text-lime-300' />Corrida de Kart</div>
          <span className="text-zinc-400">14:00h</span>
        </div>

        <div className="flex justify-between rounded-md px-4 py-3 bg-zinc-900 shadow-shape">
          <div className="flex gap-3 text-zinc-400"><CheckCircle2 className='size-5 text-lime-300' />Corrida de Kart</div>
          <span className="text-zinc-400">14:00h</span>
        </div>
      </div> */}
    </div>
  )
}
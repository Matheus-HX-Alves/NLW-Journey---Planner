import { MapPin, Calendar, Settings2 } from "lucide-react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from '../../lib/api';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Trip {
  id: string,
  destination: string,
  starts_at: string,
  ends_at: string,
  is_corfirmed: boolean
}

export default function Header() {

  const [trip, setTrip] = useState<Trip | undefined>()
  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(reponse => setTrip(reponse.data.trip))
  }, [tripId])

  const displayedDate = trip ? format(trip.starts_at, "d' de 'LLL", { locale: ptBR }).concat(' até ').concat(format(trip.ends_at, "d' de 'LLL", { locale: ptBR })) : ''

  return (
    <div className="flex items-center h-16 px-4 gap-10 rounded-md bg-zinc-900 shadow-shape">
      <div className="flex-1 flex items-center gap-2"><MapPin /> {trip?.destination}</div>
      <div className="flex items-center  gap-2"><Calendar /> {displayedDate} </div>
      <div className='h-6 w-px bg-zinc-800' />
      <Button variants="secondary">Alterar localidade <Settings2 /></Button>
    </div>
  )
}
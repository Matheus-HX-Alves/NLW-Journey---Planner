import { MapPin, Calendar, X, Settings2, ArrowRight } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";

import Button from '../../components/button';
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
interface DestinationAndDateStepProps {
  setDestination: (destination: string) => void
  setEventStartAndEndDate: (dates: DateRange | undefined) => void;
  eventStartAndEndDate: DateRange | undefined
  guestHandleOpen: () => void;
  guestHandleClose: () => void;
  isGuestInputOpen: boolean;
}

export default function DestinationAndDateStep(
  { setDestination,
    isGuestInputOpen,
    setEventStartAndEndDate,
    eventStartAndEndDate,
    guestHandleClose,
    guestHandleOpen
  }: DestinationAndDateStepProps) {

  const [isDateSelectOpen, setIsDateSelectOpen] = useState<boolean>(false);

  const displayedDate = eventStartAndEndDate && eventStartAndEndDate?.from && eventStartAndEndDate?.to ? format(eventStartAndEndDate.from, "d' de 'LLL", { locale: ptBR }).concat(' até ').concat(format(eventStartAndEndDate.to, "d' de 'LLL", { locale: ptBR })) : 'Quando?'
  function selectDateModalHandleOpen() {
    return setIsDateSelectOpen(true)
  }
  function selectDateModalHandleClose() {
    return setIsDateSelectOpen(false)
  }

  return (
    <div className="h-16 flex items-center justify-center gap-3 px-4 bg-zinc-900 rounded-md ">
      <div className='flex  gap-2 items-center'>
        <MapPin className='size-5 text-zinc-50' />
        <input onChange={event => setDestination(event.target.value)} disabled={isGuestInputOpen} className="bg-transparent outline-none text-lg w-full text-zinc-400" type="text" placeholder="Para onde você vai?" />
      </div>
      <button onClick={selectDateModalHandleOpen} disabled={isGuestInputOpen} className='flex gap-2 items-center flex-1 text-lg text-zinc-400'>
        <Calendar className='size-5 text-zinc-50' /> {displayedDate}
      </button>

      {isDateSelectOpen && (
        <div className='fixed inset-0 bg-black/60 flex justify-center items-center'>
          <div className='bg-zinc-900 rounded-lg px-6 py-5 space-y-6 '>
            <div className='flex justify-between items-center'><span className='text-lg font-bold'>{displayedDate}</span> <button onClick={selectDateModalHandleClose}> <X /></button></div>
            <DayPicker selected={eventStartAndEndDate} onSelect={setEventStartAndEndDate} mode="range" />
            <Button onClick={selectDateModalHandleClose} variants="primary" size='full'>Confirmar</Button>
          </div>
        </div>)}

      <div className='h-6 w-px bg-zinc-800' />
      {isGuestInputOpen ? (<Button variants="secondary" onClick={guestHandleClose} >Alterar local/data
        <Settings2 className='size-5' />
      </Button>) : (
        <Button onClick={guestHandleOpen} variants="primary" >Continuar
          <ArrowRight />
        </Button>
      )}
    </div>
  )
}
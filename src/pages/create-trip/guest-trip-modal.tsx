import { UserRoundPlus, ArrowRight } from "lucide-react"
import Button from "../../components/button";

interface GuestTripModalProps {
  guestModalHandleOpen: () => void;
  emailToInvite: string[];
  confirmModalHandleOpen: () => void;
}

export default function GuestTripModal({ 
  confirmModalHandleOpen, 
  emailToInvite, 
  guestModalHandleOpen 
}: GuestTripModalProps) {
  return (
    <div className="h-16 flex items-center justify-center gap-3  px-4 bg-zinc-900 rounded-md ">
      <div className=' flex-1'>
        <button onClick={guestModalHandleOpen} className="flex items-center gap-2 bg-transparent outline-none w-full text-left">
          <UserRoundPlus className='size-5 text-zinc-50' />
          {emailToInvite.length > 0 ?
            (<span className='text-lg text-zinc-100 flex-1'>{emailToInvite.length} pessoa(s) convidada(s)</span>)
            :
            (<span className='text-lg text-zinc-400 flex-1'>Quem estará na viagem?</span>)}
        </button>
      </div>
      <div className='h-6 w-px bg-zinc-800' />
      <Button onClick={confirmModalHandleOpen} variants="primary">Confirmar viagem
        <ArrowRight />
      </Button>
    </div>
  )
}
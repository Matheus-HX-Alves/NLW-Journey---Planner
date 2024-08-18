import { Mail, User, X } from "lucide-react";
import Button from "../../components/button";

interface ConfirmTripModalProps {
  confirmModalHandleClose: () => void;
  createTrip: () => void
  setOwnerName: (ownerName: string) => void;
  setOwnerEmail: (ownerEmail: string) => void;
}

export default function ConfirmTripModal({ 
  setOwnerName,
  setOwnerEmail, 
  confirmModalHandleClose, 
  createTrip }: ConfirmTripModalProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex justify-center items-center'>
      <div className='bg-zinc-900 w-[640px] rounded-lg px-6 py-5 space-y-6  '>
        <div>
          <div className='flex justify-between items-center space-y-2'>
            <h2>Confirmar criação da viagem</h2>
            <button onClick={confirmModalHandleClose}>
              <X className='size-5 text-zinc-400' />
            </button>
          </div>
          <div className='text-left text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='font-semibold'>Florianópolis, Brasil</span> nas datas de  <span className='font-semibold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</div>
        </div>
        <div className='w-full h-px bg-zinc-800' />
        <form className='w-full space-y-2'>

          <div className='flex items-center h-14 px-4 gap-2 bg-zinc-950 rounded-md'>
            <User className='size-5 text-zinc-400' />
            <input onChange={event => setOwnerName(event.target.value)} className="w-full flex-1 bg-transparent text-zinc-400 outline-none text-md" type="text" name='nameCreator' id='nameCreator' placeholder="Seu nome completo" />
          </div>
          <div className='flex items-center h-14 px-4  gap-2 bg-zinc-950 rounded-md'>
            <Mail className='size-5 text-zinc-400' />
            <input onChange={event => setOwnerEmail(event.target.value)} className="w-full flex-1 bg-transparent text-zinc-400 outline-none text-md" type="email" name='emailCreator' id='emailCreator' placeholder="Seu email pessoal" />
          </div>

        </form>

        <Button onClick={createTrip} variants="primary" size="full" >Confirmar criação da viagem</Button>
      </div>
    </div>
  )
}
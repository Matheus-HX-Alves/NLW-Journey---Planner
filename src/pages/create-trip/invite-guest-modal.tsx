import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";

interface InviteGuestModalProps {
  guestModalHandleClose: () => void;
  emailToInvite: string[];
  addEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailToInvite: (email:string) => void;
}

export default function InviteGuestModal({ 
  addEmailToInvite,
  emailToInvite,
  guestModalHandleClose,
  removeEmailToInvite } : InviteGuestModalProps) {
  return (<div className='fixed inset-0 bg-black/60 flex justify-center items-center'>
    <div className='bg-zinc-900 w-[640px] rounded-lg px-6 py-5 space-y-6  '>
      <div>
        <div className='flex justify-between items-center space-y-2'>
          <h2>Selecionar convidados</h2>
          <button onClick={guestModalHandleClose}>
            <X className='size-5 text-zinc-400' />
          </button>
        </div>
        <div className='text-left text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {emailToInvite.map(email => {
          return (
            <div key={email} className='flex items-center gap-2 text-zinc-300 py-1.5 px-2.5 bg-zinc-800 rounded-md'>
              {email}
              <button onClick={() => removeEmailToInvite(email)}> <X className='size-5 text-zinc-400' /></button>
            </div>

          )
        })}
      </div>
      <div className='w-full h-px bg-zinc-800' />
      <div className='flex items-center h-14 px-2 bg-zinc-950 rounded-md'>
        <form onSubmit={addEmailToInvite} className='p-2.5 flex-1 flex items-center '>
          <div className='flex-1 px-2 flex items-center gap-2 '>
            <AtSign className='size-5 text-zinc-400' />
            <input className="flex-1 bg-transparent text-zinc-400 outline-none text-md" type="email" name='emailGuest' id='emailGuest' placeholder="Digite o e-mail do convidado?" />
          </div>
          <button type='submit' className='flex items-center gap-2 text-md px-5 py-2 bg-lime-400 text-lime-950 rounded-md hover:bg-lime-300'>Convidar
            <Plus />
          </button>
        </form>
      </div>
    </div>
  </div>
)
}

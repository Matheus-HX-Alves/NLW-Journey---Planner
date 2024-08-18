import { Calendar, Tag, X } from "lucide-react";
import Button from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/api";

interface CreateNewActivityModalProps {
  newActivityModalClose: () => void;
}

export function CreateNewActivityModal({ newActivityModalClose }: CreateNewActivityModalProps) {

  const { tripId } = useParams()


  async function createNewActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.valueOf()

    const response = await api.post(`/trips/${tripId}/activities`, {
      title: title,
      occurs_at: occurs_at
    })
    newActivityModalClose()
    window.document.location.reload()
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-zinc-900 w-[640px] rounded-lg px-6 py-5 space-y-4">
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between ">
            <h2 className="font-bold text-white text-xl">Cadastrar atividade</h2>
            <button onClick={newActivityModalClose}>
              <X onClick={newActivityModalClose} className='size-5 text-zinc-400' />
            </button>
          </div>
          <span className="text-zinc-400 text-md">Todos convidados podem visualizar as atividades.</span>
        </div>
        <form onSubmit={event => createNewActivity(event)} className="flex flex-col space-y-4">
          <div className="flex items-center h-14 px-4 gap-2 bg-zinc-950 rounded-md">
            <Tag className="size-5 text-zinc-400" />
            <input className="fw-full flex-1 bg-transparent text-zinc-400 outline-none text-md" type="text" name="title" placeholder="Qual a atividade?" />
          </div>
          <div className="flex gap-2 ">
            <div className="flex-1 flex items-center h-14 px-4 gap-2 bg-zinc-950 rounded-md">
              <Calendar className="size-5 text-zinc-400" />
              <input className="fw-full flex-1 bg-transparent text-zinc-400 outline-none text-md" name="occurs_at" type="datetime-local" placeholder="Data" />
            </div>
          </div>
          <Button variants="primary" size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  )
}
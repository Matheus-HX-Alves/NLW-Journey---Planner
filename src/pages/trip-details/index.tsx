import { Plus, } from "lucide-react";
import { useState } from "react";
import { CreateNewActivityModal } from "./create-new-activity-modal";
import { ImportantsLinks } from "./importants-links";
import Guests from "./guests";
import Activities from "./activities";
import Header from "./header";
import Button from "../../components/button";

export default function TripDetailsPage() {

  const [isNewActivityModalOpen, setIsNewActivityModalOpen] = useState(false)


  function newActivityModalOpen() {
    return setIsNewActivityModalOpen(true)
  }
  function newActivityModalClose() {
    return setIsNewActivityModalOpen(false)
  }

  return (
    <div className="w-5/6 mx-auto py-5 min-h-screen">
      <Header />
      <main className="flex px-6 py-9 gap-16">
        <div className="flex-1 ">
          <div className="flex justify-between mb-8">
            <h2 className="text-sans text-zinc-50 font-semibold text-3xl">Atividades</h2>
            <Button variants="primary" onClick={newActivityModalOpen} >
              <Plus /> Cadastrar atividade
            </Button>
          </div>
          <Activities />
        </div>
        <div className="space-y-6 w-80">
          <ImportantsLinks />
          <div className="w-full h-1 bg-zinc-800" />
          <Guests />
        </div>
      </main>
      {
        isNewActivityModalOpen && (
          <CreateNewActivityModal newActivityModalClose={newActivityModalClose} />
        )
      }
    </div >
  )
}
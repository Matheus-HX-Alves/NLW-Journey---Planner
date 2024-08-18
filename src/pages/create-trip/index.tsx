
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InviteGuestModal from './invite-guest-modal';
import ConfirmTripModal from './confirm-trip-modal';
import GuestTripModal from './guest-trip-modal';
import { DateRange } from 'react-day-picker';
import "react-day-picker/style.css";
import DestinationAndDateStep from './destination-and-date-step';
import { api } from '../../lib/api';



export  function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [eventStartAndEndDate, setEventStartAndEndDate] = useState<DateRange | undefined>();

  const [emailToInvite, setEmailToInvite] = useState([
    'Matheus.Alves@gmail.com'
  ])

  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')


  function guestHandleOpen() {
    return setIsGuestInputOpen(true)
  }
  function guestHandleClose() {
    return setIsGuestInputOpen(false)
  }

  function guestModalHandleOpen() {
    return setIsGuestModalOpen(true)
  }
  function guestModalHandleClose() {
    return setIsGuestModalOpen(false)
  }

  function confirmModalHandleOpen() {
    return setIsConfirmModalOpen(true)
  }
  function confirmModalHandleClose() {
    return setIsConfirmModalOpen(false)
  }

  function addEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('emailGuest')?.toString()

    if (!email) {
      return
    }
    if (emailToInvite.includes(email)) {
      return
    }
    setEmailToInvite([...emailToInvite, email])
    event.currentTarget.reset()
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmailList = emailToInvite.filter(email => email !== emailToRemove)

    setEmailToInvite(newEmailList)
  }

  async function createTrip() {

    if (!eventStartAndEndDate || !eventStartAndEndDate.from || !eventStartAndEndDate.to) {
      return
    }
    if (!emailToInvite) {
      return
    }

    if (!destination) {
      return
    }
    if (!ownerName || !ownerEmail) {
      return
    }
    const response = await api.post('/trips', {
      destination: destination,
      starts_at: eventStartAndEndDate.from,
      ends_at: eventStartAndEndDate.to ,
      owner_name: ownerName,
      owner_email: ownerEmail,
      emails_to_invite: emailToInvite
    })

    const {tripId} = response.data
    navigate(`/trip/${tripId}`)
  }

  return (
    <div className="h-screen flex text-center items-center justify-center bg-pattern bg-no-repeat bg-center " >
      <div className="max-w-3xl p-6 space-y-10">
        <div className=' flex flex-col items-center gap-2'>
          <img src="./logo.svg" alt="" />
          <div className="text-zinc-300  text-lg">Convide seus amigos e planeje sua próxima viagem!</div>
        </div>

        <div className='space-y-4'>
          <DestinationAndDateStep
            setDestination={setDestination}
            guestHandleClose={guestHandleClose}
            guestHandleOpen={guestHandleOpen}
            isGuestInputOpen={isGuestInputOpen}
            setEventStartAndEndDate={setEventStartAndEndDate}
            eventStartAndEndDate={eventStartAndEndDate}
          />

          {isGuestInputOpen && (
            < GuestTripModal 
            confirmModalHandleOpen={confirmModalHandleOpen} 
            emailToInvite={emailToInvite} 
            guestModalHandleOpen={guestModalHandleOpen} />
          )}

        </div>
        <div className="text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </div>
      </div>

      {isConfirmModalOpen && (
        <ConfirmTripModal
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          confirmModalHandleClose={confirmModalHandleClose} 
          createTrip={createTrip} />
      )}

      {isGuestModalOpen && (
        <InviteGuestModal 
        addEmailToInvite={addEmailToInvite} 
        emailToInvite={emailToInvite} 
        guestModalHandleClose={guestModalHandleClose} 
        removeEmailToInvite={removeEmailToInvite} />
      )}
    </div>
  )
}

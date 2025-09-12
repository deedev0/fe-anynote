import { useEffect, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import CardList from '../components/CardList';
import { getNotes } from '../utils/api/notesApi';

export default function Dashboard() {
  const [notes, setNotes] = useState();

  useEffect(() => {
    const msg = sessionStorage.getItem('success');
    if (msg) {
      toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => {
          sessionStorage.removeItem('success');
        }
      });
    }
  }, []);
  
  useEffect(() => {
    async function fetchNotes() {
      try {
        const notes = await getNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();
  }, [notes])

  return (
    <>
      { notes?.length ? <CardList notes={notes} /> : <p className='text-white text-2xl text-center'>No note...</p>}
      <ToastContainer />
    </>
  )
}
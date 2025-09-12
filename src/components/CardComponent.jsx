import {Card, CardHeader, CardBody, Divider, CardFooter, Tooltip} from "@heroui/react";
import { BiArchiveIn, BiArchiveOut, BiEditAlt, BiPin, BiSolidPin, BiSolidTrash } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import {  deleteNote, toggleArchice, togglePin } from '../utils/api/notesApi';
import Swal from 'sweetalert2';

export default function CardComponent({ note }) {
  const navigate = useNavigate();
  const normalNoteCheck = note.isPinned | note.isArchived;

  const handleArchive = async () => {
    try {
      await toggleArchice(note._id, !note.isArchived);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePin = async () => {
    try {
      await togglePin(note._id, !note.isPinned);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    Swal.fire({
      title: "Do you want to delete this note?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Delete`
    }).then(async (result) => {
      if (result.isDenied) {
        try {
          await deleteNote(note._id);
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  
  return (
    <Card className="group relative overflow-visible p-4 rounded-lg shadow-md break-inside-avoid hover:bg-foreground-50 mb-3 transition-transform hover:scale-[1.01]"> 
      <CardHeader className="flex gap-3">
        <h1 className='text-2xl'>{note.title}</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className='text-1xl'>{note.content}</p>
      </CardBody>
      <Divider />
      <CardFooter className='mb-3'>
        <h1 className='text-1xl'>{note.tags.map((tag) => ( 
          <span className='mr-3 text-secondary' key={tag}>#{tag}</span>
        ))}</h1>
      </CardFooter>
      <div className="absolute bottom-2 left-2 right-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        {!normalNoteCheck ? 
          <>
            <Tooltip content='Pin' color='secondary'>
              <button onClick={() => handlePin()} className="p-2 text-fuchsia-400 text-2xl rounded-full hover:bg-blue-50 hover:cursor-pointer">
                <BiSolidPin />
              </button>
            </Tooltip>
            <Tooltip content='Archive' color='primary'>
              <button onClick={() => handleArchive()} className="p-2 text-blue-400 text-2xl rounded-full hover:bg-blue-50 hover:cursor-pointer">
                <BiArchiveIn />
              </button>
            </Tooltip>
          </>
          :
          <Tooltip content={note.isArchived ? 'Unarchive' : 'Unpin'} color='secondary'>
            <button onClick={note.isArchived ? () => handleArchive() : () => handlePin()} className="p-2 text-fuchsia-400 text-2xl rounded-full hover:bg-blue-50 hover:cursor-pointer">
              {note.isArchived ? <BiArchiveOut /> : <BiPin />}
            </button>
          </Tooltip>
        }
        <Tooltip content='Edit' color='success'>
          <Link to={`/edit/${note._id}`} className="p-2 text-emerald-400 text-2xl rounded-full hover:bg-blue-50 hover:cursor-pointer"><BiEditAlt /></Link>
        </Tooltip>
        <Tooltip content='Delete' color='danger'>
          <button onClick={() => handleDelete()} className="p-2 text-red-400 text-2xl rounded-full hover:bg-blue-50 hover:cursor-pointer"><BiSolidTrash /></button>
        </Tooltip>
      </div>
    </Card>
  );
}

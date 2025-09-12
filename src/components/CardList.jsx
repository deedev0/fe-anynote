import { Accordion, AccordionItem } from '@heroui/react'
import CardComponent from './CardComponent'

export default function CardList({ notes }) {
  const pinnedNotes   = notes.filter(note => note.isPinned && !note.isArchived);
  const archivedNotes = notes.filter(note => note.isArchived);
  const normalNotes   = notes.filter(note => !note.isPinned && !note.isArchived);

  return (
    <>
    <h1 className='text-white text-2xl mb-3'>Pinned</h1>
      <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
        { pinnedNotes?.length ? (pinnedNotes.map((note) => (
                <CardComponent key={note._id} note={note} />
              ))) : <p className='text-white mt-5 text-center'>No note...</p> }
      </div>
      <h1 className='text-white text-2xl mb-3'>Notes</h1>
      <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
        { normalNotes?.length ? (normalNotes.map((note) => (
                <CardComponent key={note._id} note={note} />
              ))) : <p className='text-white mt-5 text-center'>No note...</p> }
      </div>
      <Accordion>
        <AccordionItem classNames={{ title: 'text-white', trigger: "border-b border-gray-600" }} key="1" aria-label="Archived" title="Archived">
          <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
            { archivedNotes?.length ? (archivedNotes.map((note) => (
                <CardComponent key={note._id} note={note} />
              ))) : <p className='text-white mt-5 text-center'>No note...</p> }
                  </div>
        </AccordionItem>
      </Accordion>
    </>
  )
}
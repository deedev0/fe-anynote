import { Input, Textarea, Button, RadioGroup, Radio } from '@heroui/react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { editNote, getNote } from '../utils/api/notesApi';
import { useEffect, useState } from 'react';

export default function EditNote() {
  const { id } = useParams();
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      content: '',
      tags: '',
      status: '',
    }
  });
  const navigate = useNavigate();

  const [note, setNote] = useState();

  useEffect(() => {
    async function getNoteById() {
      try {
        const note = await getNote(id);
        setNote(note);
        reset({
          title: note.title,
          content: note.content,
          tags: note.tags.join(' '),
          status: note.isPinned ? 'isPinned' : (note.isArchived && 'isArchived'),
        });
      } catch (error) {
        console.log(error); 
      }
    }

    getNoteById();
  }, [id])

  const onSubmit = async (data) => {
    data.isPinned = data.status === 'isPinned';
    data.isArchived = data.status === 'isArchived';
    data.tags = data.tags.split(' ');
    try {
      await editNote(note._id, data);
      sessionStorage.setItem('success', 'Note success updated!.');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className='text-3xl text-white text-center'>Edit Note</h1>
      {note ? 
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 place-items-center mx-auto my-auto">
            <div className="flex w-150 flex-wrap md:flex-nowrap gap-4 mt-20">
              <Input label="Ttitle" type="text" { ...register('title') } />
            </div>
            <div className="flex w-150 flex-wrap md:flex-nowrap gap-4 mt-5 mb-3">
              <Textarea label="Description" placeholder="Enter your description" { ...register('content') } />
            </div>
            <div className="flex w-150 flex-wrap md:flex-nowrap gap-4 mt-5">
              <Controller 
                name='status'
                control={control}
                render={({ field }) => (
                  <RadioGroup { ...field } classNames={{ label: 'text-white' }} label="Select action note" defaultValue={note.isPinned ? 'isPinned' : (note.isArchived && 'isArchived')}>
                    <Radio classNames={{ label: 'text-white' }} value="isPinned">Pin</Radio>
                    <Radio classNames={{ label: 'text-white' }} value="isArchived">Archive</Radio>
                  </RadioGroup>
                )}
              />
            </div>
            <div className="flex w-150 flex-wrap md:flex-nowrap gap-4 mt-5">
              <Input label="Tags" type="text" { ...register('tags') } />
            </div>
            <div className="flex w-150 flex-wrap md:flex-nowrap gap-4 mt-5">
              <Button type='submit' className='w-full' color="primary">Update</Button>
            </div>
          </div>
        </form>
        :
        <p>Loading...</p>
      }
    </>
  )
}
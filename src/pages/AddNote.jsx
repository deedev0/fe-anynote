import { Input, Textarea, Button, RadioGroup, Radio } from '@heroui/react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/api/notesApi';

export default function AddNote() {
  const { control, register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.isPinned = data.status === 'isPinned';
    data.isArchived = data.status === 'isArchived';
    data.tags = data.tags.split(' ');
    try {
      await addNote(data);
      sessionStorage.setItem('success', 'Note success added!.');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
                <RadioGroup { ...field } classNames={{ label: 'text-white' }} label="Select action note">
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
            <Button type='submit' className='w-full' color="primary">Save</Button>
          </div>
        </div>
      </form>
    </>
  )
}
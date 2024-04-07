'use client';

import { Button } from '@/components/ui-library/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui-library/dialog';
import { Label } from '@/components/ui-library/label';
import { ShadCNInput } from '@/components/ui-library/ShadCN-input';
import { Textarea } from '@/components/ui-library/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import React from 'react';

export function CreateProjectMenu() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.currentTarget);
    console.log('Form submitted');
    e.preventDefault();
    alert('Project created!');
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    alert(JSON.stringify({ name, description }));
  };

  const handleButtonClick = () => {
    console.log('Button clicked');
    if (formRef.current) {
      console.dir(formRef.current);
      console.log('Form ref is set');
      const event = new Event('submit', { cancelable: true, bubbles: true }); // Add bubbles: true
      formRef.current.dispatchEvent(event);
    }
  };

  return (
    <div className='w-full flex justify-end py-5'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary'>Opret nyt projekt</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            id='create-project-form'
          >
            <DialogHeader>
              <DialogTitle>Opret projekt</DialogTitle>
              <DialogDescription>
                Opret et nyt projekt ved at udfylde felterne nedenfor.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='name'
                  className='text-right'
                >
                  Navn
                </Label>
                <ShadCNInput
                  id='name'
                  defaultValue='Cool nyt projekt!'
                  className='col-span-3'
                  ref={nameRef}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='description'
                  className='text-right'
                >
                  Beskrivelse
                </Label>
                <Textarea
                  id='description'
                  defaultValue='En god beskrivelse! :D'
                  className='col-span-3'
                  ref={descriptionRef}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type='button'
                  onClick={handleButtonClick}
                >
                  Opret projekt
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

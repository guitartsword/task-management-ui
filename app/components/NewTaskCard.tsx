"use client";

import { useState } from 'react';
import { Task } from '../types/task';
import BasicCreateTaskCard from './BasicCreateTaskCard';


export default function NewTaskCard({status}: {status: Task['status']}) {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  return (
    isCreating ? 
    <BasicCreateTaskCard
      status={status}
      onSubmit={() => {
        setIsCreating(false);
      }}
    /> : 
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
      onClick={() => {setIsCreating(true)}}
    >
      Create
    </button>
  );
}

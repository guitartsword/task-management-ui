'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/config';
import { config } from '@/app/config';
import { Task } from '@/app/types/task';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateTask(id: number, task: FormData, token: string) {
  const taskBody: Omit<Task, 'id'> = {
    title: String(task.get('title') || ''),
    description: String(task.get('description') || ''),
    due_date: String(task.get('due_date') || ''),
    status: task.get('status') as Task['status'],
  }
  const res = await fetch(`${config.API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    next: {
      tags: ['tasks']
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
    },
    body: JSON.stringify(taskBody),
  });
  revalidateTag('tasks')
  redirect('/')
}

export async function createTask(task: FormData, token: string) {
  const taskBody: Partial<Omit<Task, 'id'>> & Omit<Task, 'id'|'status'|'due_date'> = {
    title: String(task.get('title') || ''),
    description: String(task.get('description') || ''),
  }
  const newStatus = task.get('status') as Task['status']
  const newDueDate = task.get('due_date') as Task['due_date']
  if (newStatus) {
    taskBody.status = newStatus
  }
  if (newDueDate) {
    taskBody.due_date = newDueDate
  }
  await fetch(`${config.API_BASE_URL}/tasks`, {
    method: 'POST',
    next: {
      tags: ['tasks']
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
    },
    body: JSON.stringify(taskBody),
  });
  revalidateTag('tasks')
}

export async function deleteTask(id: number, token: string) {
  await fetch(`${config.API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    next: {
      tags: ['tasks']
    },
    headers: {
      'Authorization': token,
    },
  });
  revalidateTag('tasks')
  redirect('/')
}

export async function submitSaveOrDelete(id: number, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/api/auth/signin');
  }
  const token = session.user.token;
  if (formData.get('action') === 'save') {
    await updateTask(id, formData, token)
  }
  if (formData.get('action') === 'delete') {
    await deleteTask(id, token)
  }
}
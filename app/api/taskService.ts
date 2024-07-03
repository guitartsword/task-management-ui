import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]/config';
import { redirect } from 'next/navigation';
import { config } from '../config';
import { Task } from '../types/task';
import { revalidateTag } from 'next/cache';

export interface TaskResponse {
  data: Task[];
  count: number;
}

const getApiHeaders = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/api/auth/signin')
  }
  const headers = new Headers()
  headers.set('Authorization', session.user.token)
  return headers;
}

export const listTasks = async () => {
  const headers = await getApiHeaders();
  const res = await fetch(`${config.API_BASE_URL}/tasks/?limit=100`, {
    headers,
    next: {
      tags: ['tasks'],
      revalidate: 60,
    },
  });

  if (!res.ok) {
    console.log(res)
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<TaskResponse>;
}

export async function createTask(task: FormData) {
  const headers = await getApiHeaders();
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
  headers.set('Content-Type', 'application/json')
  await fetch(`${config.API_BASE_URL}/tasks`, {
    method: 'POST',
    next: {
      tags: ['tasks']
    },
    headers,
    body: JSON.stringify(taskBody),
  });
  revalidateTag('tasks')
}
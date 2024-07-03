import { getServerSession } from 'next-auth';
import Link from 'next/link';

import { config } from '@/app/config';
import { Task } from '@/app/types/task';
import { authOptions } from '@/app/api/auth/[...nextauth]/config';
import { submitSaveOrDelete } from './actions';
import { redirect } from 'next/navigation';

async function getData(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/api/auth/signin')
  }
  const res = await fetch(`${config.API_BASE_URL}/tasks/${id}`, {
    next: {
      tags: ['tasks'],
      revalidate: 60
    },
    headers: {
      'Authorization': session.user.token,
    }
  })
  
  if (!res.ok) {
    const json = await res.json()
    // console.log(res, text)
    throw new Error(json.detail)
  }
  return res.json() as Promise<Task>
}

export default async function TaskDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const task = await getData(id)
  const submitSaveOrDeleteWithId = submitSaveOrDelete.bind(null, id)
  return <div className="p-6 h-screen">
    <h1 className="text-3xl font-bold mb-6">Task Detail</h1>
    <form action={submitSaveOrDeleteWithId} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={task.title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={task.description}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task.status}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            type="datetime-local"
            id="due_date"
            step="1"
            name="due_date"
            defaultValue={task.due_date.split('.')[0]}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-end">
          <Link
            href="/"
            className="bg-slate-300 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </Link>
          <button
            type="submit"
            name="action"
            value="delete"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            Delete
          </button>
          <button
            type="submit"
            name="action"
            value="save"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            Save Changes
          </button>
        </div>
      </form>
  </div>
}

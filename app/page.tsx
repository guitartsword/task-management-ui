import { listTasks } from '@/app/api/taskService';

import TaskCard from '@/app/components/TaskCard';
import NewTaskCard from '@/app/components/NewTaskCard';
import TaskColumnStatus from '@/app/components/TaskColumnStatus';
import Link from 'next/link';

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { data: tasks } = await listTasks();
  const todo = tasks
    .filter((t) => t.status === 'todo')
    .map((t) => <TaskCard key={t.id} task={t} />);
  const doing = tasks
    .filter((t) => t.status === 'doing')
    .map((t) => <TaskCard key={t.id} task={t} />);
  const done = tasks
    .filter((t) => t.status === 'done')
    .map((t) => <TaskCard key={t.id} task={t} />);

  return (
    <main className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-right text-blue-600 hover:text-blue-700">
          <Link href="/api/auth/signout">Sign Out</Link>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Task Management</h1>
        <div className="grid grid-cols-3 gap-4">
          <TaskColumnStatus title="To Do" status="todo">
            {todo}
            <NewTaskCard status="todo" />
          </TaskColumnStatus>
          <TaskColumnStatus title="Doing" status="doing">
            {doing}
            <NewTaskCard status="doing" />
            </TaskColumnStatus>
          <TaskColumnStatus title="Done" status="done">
            {done}
            <NewTaskCard status="done" />
            </TaskColumnStatus>
        </div>
      </div>
    </main>
  );
}

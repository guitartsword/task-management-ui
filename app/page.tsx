import TaskCard from '@/app/components/TaskCard';
import NewTaskCard from '@/app/components/NewTaskCard';
import TaskColumnStatus from '@/app/components/TaskColumnStatus';
import { Task } from '@/app/types/task';
import { config } from './config';

export const dynamic = 'force-dynamic'

interface TaskResponse {
  data: Task[];
  count: number;
}

async function getTasks() {
  const res = await fetch(`${config.API_BASE_URL}/tasks/?limit=100`, {
    next: {
      tags: ['tasks'],
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<TaskResponse>;
}

const tasks: Task[] = [
  {
    description: 'Description for T1',
    status: 'todo',
    due_date: '2024-07-03T01:31:27.873611',
    title: 'Task 1',
    id: 1,
  },
  {
    description: 'Description for T2',
    status: 'todo',
    due_date: '2024-07-03T01:31:27.873611',
    title: 'Task 2',
    id: 2,
  },
  {
    description: 'Description for T3',
    status: 'doing',
    due_date: '2024-07-03T01:31:27.873611',
    title: 'Task 3',
    id: 3,
  },
  {
    description: 'Description for T4',
    status: 'doing',
    due_date: '2024-07-03T01:31:27.873611',
    title: 'Task 4',
    id: 4,
  },
  {
    description: 'Description for T5',
    status: 'done',
    due_date: '2024-07-07T01:31:27.873611',
    title: 'Task 5',
    id: 5,
  },
  {
    description: 'Description for T6',
    status: 'done',
    due_date: '2024-07-07T01:31:27.873611',
    title: 'Task 6',
    id: 6,
  },
  {
    description: 'Description for T7',
    status: 'done',
    due_date: '2024-07-07T01:31:27.873611',
    title: 'Task 7',
    id: 7,
  },
];

export default async function Home() {
  const { data: tasks } = await getTasks();
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

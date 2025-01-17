'use client';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '@/app/context/dndTypes';
import { Task } from '@/app/types/task';
import Link from 'next/link';
import { config } from '../config';
import { updateTask } from '../tasks/[id]/actions';
import { useSession } from 'next-auth/react';

interface TaskCardProps {
  task: Task;
  click?: () => {};
}

export default function TaskCard({ task, click }: TaskCardProps) {
  const {data: session} = useSession();
  const [, drag] = useDrag(() => ({
    type: ItemTypes.task,
    item: task,
    end(item, monitor) {
      if (!session) {
        return;
      }
      const dropResult = monitor.getDropResult<{ status: Task['status'] }>();
      if (!dropResult || dropResult?.status === item.status) {
        return;
      }
      const formData = new FormData();
      Object.entries(item).forEach(([key, value]) => {
        formData.set(key, value);
      });
      formData.set('status', dropResult.status);
      updateTask(item.id, formData, session.user.token);
    },
  }));
  return drag(
    <span>
      <Link
        href={`/tasks/${task.id}`}
        onClick={click}
        className="block bg-white shadow-md rounded-lg p-4 mb-4 cursor-move"
      >
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
      </Link>
    </span>
  );
}

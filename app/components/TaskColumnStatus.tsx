'use client';

import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { ItemTypes } from '@/app/context/dndTypes';
import { Task } from '@/app/types/task';

interface TaskColumnStatusProps {
  children?: React.ReactNode;
  title: string;
  status: string;
}

export default function TaskColumnStatus({
  children,
  title,
  status,
}: Readonly<TaskColumnStatusProps>) {
  const [{ droppable, isOver}, drop] = useDrop(
    () => ({
      accept: ItemTypes.task,
      drop: () => {
        return { status }
      },
      collect: (monitor) => {
        const isDroppable = monitor.canDrop() && monitor.getItem<Task>().status !== status
        return {
          droppable: isDroppable,
          isOver: isDroppable && monitor.isOver(),
        }
      },
    }),
  );
  let droppableClass = '';
  if (droppable) {
    droppableClass = 'bg-green-100'
  }
  if (isOver) {
    droppableClass = 'bg-green-200'
  }

  return drop(
    <div className={droppableClass}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

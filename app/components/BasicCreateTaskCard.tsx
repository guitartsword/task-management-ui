import { createTask } from '../tasks/[id]/actions';
import { Task } from '../types/task';

interface CardFormProps {
  status: Task['status'];
  onSubmit?: () => void;
}

export default function BasicCreateTaskCard({ status, onSubmit }: CardFormProps) {
  return (
    <form
      action={async (formData) => {
        createTask(formData);
        if (onSubmit) {
          onSubmit()
        }
      }}
      className="block bg-white shadow-md rounded-lg p-4 mb-4"
    >
      <input type="hidden" name="status" value={status} />
      <div className="mb-4">
        <input
          autoFocus
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          id="description"
          placeholder="Description"
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        >
          Create
        </button>
      </div>
    </form>
  );
}

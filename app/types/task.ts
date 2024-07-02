type StatusOptions = 'todo'|'doing'|'done'

export interface Task {
    id: number;
    title: string;
    description: string;
    status: StatusOptions;
    due_date: string;
}
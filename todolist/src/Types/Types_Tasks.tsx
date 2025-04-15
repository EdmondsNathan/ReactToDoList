export type Task = {
    id: number;
    text: string;
    completed: boolean;
}

export type TaskItemProps = {
    task: Task;
    setTask: (newTask: Task) => void;
    handleDelete: (id: number) => void;
}

export type NewTaskProps = {
    onAdd: (task: Task) => void;
}
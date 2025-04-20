import { useState } from 'react';
import type { Task, /*TaskItemProps, NewTaskProps*/ } from './Types/Types_Tasks';
import { NewTask, TaskItem } from './Components/Components_Tasks';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const UpdateTask = (updatedTask: Task) => {
        setTasks(previousTasks =>
            previousTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    }

    const DeleteTask = (id: number) => {
        setTasks(previousTasks => previousTasks.filter(task => task.id !== id));
    }

    return (
        <>
            <h1>To-do List</h1>
            <NewTask onAdd={(task) => setTasks([...tasks, task])} />
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} setTask={UpdateTask} handleDelete={DeleteTask} />
                ))}
            </ul>
        </>
    )
}

export default App
import { useEffect, useState } from 'react';

type Task = {
    id: number;
    text: string;
    completed: boolean;
}

type TaskProps = {
    task: Task;
}

type NewTaskProps = {
    onAdd: (task: Task) => void;
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    return (
        <>
            <h1>Todo List</h1>
            <NewTask onAdd={(task) => setTasks([...tasks, task])} />
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </>
    )
}

function NewTask({ onAdd }: NewTaskProps) {
    const [text, setText] = useState("");

    function createNewTask(text: string) {
        if (!text.trim()) {
            return;
        }

        const newTask: Task = {
            id: Date.now(), // unique-ish ID
            text,
            completed: false,
        };

        setText("");
        onAdd(newTask);
    }

    return (
        <div>
            <input type="text" placeholder="New Task" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={((e) => e.key == 'Enter' && createNewTask(text))} />
            <button onClick={() => {
                createNewTask(text);
            }}>Add</button>
        </div >
    )
}

function TaskItem({ task }: TaskProps) {
    return (
        <>
            <input type="checkbox" checked={task.completed} />
            <p>{task.text}</p>
            <button>Delete</button>
            <br />
        </>
    )
}

export default App

import { useState } from 'react';
import type { Task, TaskItemProps, NewTaskProps } from '../Types/Types_Tasks';
import styles from '../CSS/TaskItem.module.css';

export function TaskItem({ task, setTask, handleDelete }: TaskItemProps) {
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, completed: e.target.checked });
    }

    return (
        <div className={styles.taskItem}>
            <input type="checkbox" checked={task.completed} onChange={handleCheckBox} />
            <p className={task.completed ? styles.completed : ""}>{task.text}</p>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <br />
        </div>
    )
}

export function NewTask({ onAdd }: NewTaskProps) {
    const [text, setText] = useState("");

    const CreateNewTask = (text: string) => {
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
            <input type="text" placeholder="New Task" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={((e) => e.key == 'Enter' && CreateNewTask(text))} />
            <button onClick={() => {
                CreateNewTask(text);
            }}>Add</button>
        </div >
    )
}
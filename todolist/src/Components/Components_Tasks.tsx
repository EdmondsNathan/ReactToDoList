import { useState } from 'react';
import type { Task, TaskItemProps, NewTaskProps } from '../Types/Types_Tasks';
import styles from '../CSS/TaskItem.module.css';

export function TaskItem({ task, setTask, handleDelete }: TaskItemProps) {
    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, completed: e.target.checked });
    }
        ;/* const HandleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, text: e.target.value });
    }*/

    return (
        <div className={styles.taskItem}>
            <input type="checkbox" checked={task.completed} onChange={handleCheckBox} />
            <TaskItemText task={task} setTask={setTask} handleDelete={handleDelete} />
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <br />
        </div >
    )
}

export function NewTask({ onAdd }: NewTaskProps) {
    const [text, setText] = useState("");

    const CreateNewTask = (text: string) => {
        if (!text.trim()) {
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            text,
            completed: false,
        };

        setText("");
        onAdd(newTask);
    }

    return (
        <div>
            <input
                type="text"
                placeholder="New Task"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={((e) => e.key == 'Enter' && CreateNewTask(text))}
                autoFocus
            />
            <button
                onClick={() => {
                    CreateNewTask(text);
                }}>Add</button>
        </div >
    )
}

function TaskItemText({ task, setTask }: TaskItemProps) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, text: e.target.value });
    };

    const handleClick = () => {
        setEdit(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, shouldEdit: boolean) => {
        if (e.key === 'Enter') {
            setEdit(shouldEdit);
        }
    };

    const [edit, setEdit] = useState(false);

    if (edit == true && task.completed == true) {
        setEdit(false);
    }

    if (edit == false) {
        return (
            <p
                tabIndex={0}
                className={task.completed ? styles.completed : ""}
                onKeyDown={(e) => handleKeyDown(e, true)}
                onClick={handleClick}
            >
                {task.text}
            </p>
        );
    } else {
        return (
            <input
                type="text"
                value={task.text}
                onChange={handleTextChange}
                onBlur={() => setEdit(false)}
                onKeyDown={(e) => handleKeyDown(e, false)}
                autoFocus
            />
        );
    }
}
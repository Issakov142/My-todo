import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Filter} from './App';

export type Item = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: Array<Item>
    deleteTask: (id: string) => void
    filterTask: (value: Filter) => void
    addTask: (newTaskTitle: string) => void
}


export function Todolist(props: Props) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTask()

        }
    }

    function addTask() {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => {
        props.filterTask('all')
    }
    const onActiveClickHandler = () => {
        props.filterTask('active')
    }
    const onCompletedClickHandler = () => {
        props.filterTask('completed')
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input value={newTaskTitle} onChange={onNewTaskTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {props.tasks.map((t) => {

                    const onDeleteClickHandler = () => {
                        props.deleteTask(t.id)
                    }

                    return <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={onDeleteClickHandler}>x
                        </button>
                    </li>
                })}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>


        </div>

    )
}
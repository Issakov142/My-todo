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
    changeTaskStatus: (taskId: string, value: boolean) => void
    filter: Filter
}


export function Todolist(props: Props) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTask()

        }
    }

    function addTask() {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('')
        } else {
            setError('Fielder is required')
        }
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
                <input className={error ? 'error' : ''} value={newTaskTitle} onChange={onNewTaskTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addTask}>+
                </button>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {props.tasks.map((t) => {

                    const onDeleteClickHandler = () => {
                        props.deleteTask(t.id)
                    }
                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }

                    return <li className={t.isDone ? "is-done" : ""} key={t.id}><input type="checkbox" onChange={onChangeCheckboxHandler} checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={onDeleteClickHandler}>x
                        </button>
                    </li>
                })}

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>


        </div>

    )
}
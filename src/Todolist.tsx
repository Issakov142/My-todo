import React, {ChangeEvent} from 'react';
import {Filter} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type Item = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    todolistId: string
    title: string
    tasks: Array<Item>
    deleteTask: (id: string, todolistId: string) => void
    filterTask: (value: Filter, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, value: boolean, todolistId: string) => void
    filter: Filter
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}


export function Todolist(props: Props) {

    function onDeleteTodolistHandler() {
        props.deleteTodolist(props.todolistId)
    }

    const onAllClickHandler = () => {
        props.filterTask('all', props.todolistId)
    }
    const onActiveClickHandler = () => {
        props.filterTask('active', props.todolistId)
    }
    const onCompletedClickHandler = () => {
        props.filterTask('completed', props.todolistId)
    }

    const AddNewTaskTitleCallback = (value: string) => {
        props.addTask(value, props.todolistId)
    }

    const TodolistNewTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }

    return (
        <div>
            <h1><EditableSpan title={props.title} editableSpanCallback={TodolistNewTitleHandler}/>
                <button onClick={onDeleteTodolistHandler}>xx</button>

            </h1>
            <AddItemForm addCallback={AddNewTaskTitleCallback}/>
            <ul>
                {props.tasks.map((t) => {

                    const onDeleteClickHandler = () => {
                        props.deleteTask(t.id, props.todolistId)
                    }
                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                    }
                    const saveNewTaskTitleCallback = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todolistId)
                    }

                    return <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                        <input type="checkbox"
                               onChange={onChangeCheckboxHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} editableSpanCallback={saveNewTaskTitleCallback}/>
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


import React from 'react';
import {TodolistType} from '../../../../../app/App';
import {AddItemForm} from '../../../../../common/components/AddItemForm/AddItemForm';
import {addTaskAC} from '../../../model/tasks-reducer';
import {useAppDispatch} from '../../../../../app/hooks';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';
import {Tasks} from './Tasks/Tasks';
import {FilterTasksButtons} from './FilterTasksButtons/FilterTasksButtons';

export type Item = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    todolist: TodolistType
}

export function Todolist({todolist}: Props) {
    // const { id: todolistId} = todolist

    const dispatch = useAppDispatch()

    const addTask = (newTaskTitle: string) => {
        dispatch(addTaskAC({title: newTaskTitle, todolistId: todolist.id}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addCallback={addTask}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}


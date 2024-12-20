import {TodolistType} from '../../../../../../app/App';
import {List} from '@mui/material';
import React from 'react';
import {useAppSelector} from '../../../../../../app/hooks';
import {selectTasks} from '../../../../model/tasks-selectors';
import {Task} from './Task/Task';


type Props = {
    todolist: TodolistType
}


export function Tasks({todolist}: Props) {

    const {filter, id: todolistId} = todolist

    const tasks = useAppSelector(selectTasks)

    let filteredItems = tasks[todolistId]
    if (filter === 'completed') {
        filteredItems = filteredItems.filter(i => i.isDone)
    }
    if (filter === 'active') {
        filteredItems = filteredItems.filter(i => !i.isDone)
    }



    return (

        <List>
            {filteredItems.map((t) => {
                return <Task key={t.id} t={t} todolist={todolist}/>
            })}

        </List>
    )
}


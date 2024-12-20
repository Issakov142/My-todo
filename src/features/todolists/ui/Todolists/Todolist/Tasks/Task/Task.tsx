import {TodolistType} from '../../../../../../../app/App';
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {ChangeEvent} from 'react';
import {useAppDispatch} from '../../../../../../../app/hooks';
import {Item} from '../../Todolist';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../../../../model/tasks-reducer';
import {getListItemSx} from './Task.styles';


type Props = {
    t: Item
    todolist: TodolistType
}


export function Task({t, todolist}: Props) {
    const {id: todolistId} = todolist

    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(removeTaskAC({taskId: t.id, todolistId}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId: t.id, isDone: newStatusValue, todolistId}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({taskId: t.id, title, todolistId}))
    }

    return (
        <ListItem sx={getListItemSx(t.isDone)}>
            <div>
                <Checkbox checked={t.isDone} onChange={changeTaskStatus}/>
                <EditableSpan title={t.title} editableSpanCallback={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}


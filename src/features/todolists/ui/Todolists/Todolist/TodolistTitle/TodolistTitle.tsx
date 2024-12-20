import {TodolistType} from '../../../../../../app/App';
import {EditableSpan} from '../../../../../../common/components/EditableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import {changeTodolistTitleAC, removeTodolistAC} from '../../../../model/todolists-reducer';
import {useAppDispatch} from '../../../../../../app/hooks';
import styles from './TodolistTitle.module.css'


type Props = {
    todolist: TodolistType
}


export function TodolistTitle({todolist}: Props) {

    const {title, id: todolistId} = todolist

    const dispatch = useAppDispatch()

    const deleteTodo = () => {
        dispatch(removeTodolistAC(todolistId))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({todolistTitle: title, todoId: todolistId}))
    }

   return (

       <div className={styles.container}>

       <h1><EditableSpan title={title} editableSpanCallback={changeTodolistTitle}/>
           <IconButton onClick={deleteTodo}>
               <DeleteIcon/>
           </IconButton>
       </h1>
       </div>
   )
}


import {Filter, TodolistType} from '../../../../../../app/App';
import {Box, Button} from '@mui/material';
import React from 'react';
import {useAppDispatch} from '../../../../../../app/hooks';
import {changeTodolistFilterAC} from '../../../../model/todolists-reducer';
import {filterButtonsContainerSx} from './FilterTasksButtons.styles';


type Props = {
    todolist: TodolistType
}

export function FilterTasksButtons({todolist}: Props) {
    const { filter, id: todolistId} = todolist

    const dispatch = useAppDispatch()

    const filterTasks = (value: Filter) => {
        dispatch(changeTodolistFilterAC({todoId: todolistId, filterValue: value}))
    }

   return (
       <Box sx={filterButtonsContainerSx}>
           <Button color={'inherit'} variant={filter === 'all' ? 'outlined' : 'text'} onClick={()=>filterTasks('all')}>All
           </Button>
           <Button color={'primary'} variant={filter === 'active' ? 'outlined' : 'text'}
                   onClick={()=>filterTasks('active')}>Active
           </Button>
           <Button color={'secondary'} variant={filter === 'completed' ? 'outlined' : 'text'}
                   onClick={()=>filterTasks('completed')}>Completed
           </Button>
       </Box>
   )
}


import Grid from '@mui/material/Grid2';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import {Box} from '@mui/material';
import React from 'react';
import {useAppDispatch} from './hooks';
import {addTodolistAC} from '../features/todolists/model/todolists-reducer';
import {Todolists} from '../features/todolists/ui/Todolists/Todolists';

export const Main = () => {

    const dispatch = useAppDispatch()

    const addTodolist = (todolistTitle: string) => {
        const addTodolistAction = addTodolistAC(todolistTitle)
        dispatch(addTodolistAction)
    }

    return (
        <Box sx={{flexGrow: 1, m: '0 150px'}}>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addCallback={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Box>
    )
}
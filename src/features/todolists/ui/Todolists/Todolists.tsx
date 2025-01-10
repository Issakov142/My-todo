import Grid from '@mui/material/Grid2';
import {Paper} from '@mui/material';
import {Todolist} from './Todolist/Todolist';
import React from 'react';
import {useAppSelector} from '../../../../app/hooks';
import {selectTodolists} from '../../model/todolists-selectors';

export const Todolists = () => {
    console.log('Todos rendering')

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map((tl) => {

                    return (
                        <Grid key={tl.id}>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <Todolist todolist={tl}/>
                            </Paper>
                        </Grid>
                    )
                }
            )}
        </>
    )
}
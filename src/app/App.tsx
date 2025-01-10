import React from 'react';
import {Item} from '../features/todolists/ui/Todolists/Todolist/Todolist';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {useAppSelector} from './hooks';
import {selectTheme} from './app-selectors';
import {getTheme} from '../common/theme/theme';
import {Main} from './Main';
import {Header} from '../common/components/Header/Header';

export type Filter = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: Filter
}


export type TodolistsItemsType = { [todolistId: string]: Item[] }


function App() {
    console.log("app is called")

    const themeMode = useAppSelector(selectTheme)


    const theme = getTheme(themeMode)


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}


export default App;

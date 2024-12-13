import React, {useState} from 'react';
import './App.css';
import {Item, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Box, createTheme, CssBaseline, IconButton, Paper, Switch, ThemeProvider, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Grid2';
import {MenuButton} from './MenuButton';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './model/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './model/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './app/store';

export type Filter = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: Filter
}
type ThemeMode = 'dark' | 'light'
export type TodolistsItemsType = { [todolistId: string]: Item[] }


function AppWithRedux() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    const deleteTask = (id: string, todolistId: string) => {

        dispatch(removeTaskAC({taskId: id, todolistId}))

    }

    const addTask = (newTaskTitle: string, todolistId: string) => {

        dispatch(addTaskAC({title: newTaskTitle, todolistId}))

    }

    const changeTaskStatus = (taskId: string, value: boolean, todolistId: string) => {

        dispatch(changeTaskStatusAC({taskId, isDone: value, todolistId}))

    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {

        dispatch(changeTaskTitleAC({taskId, title, todolistId}))

    }



    const addTodolist = (todolistTitle: string) => {

        let addTodolistAction = addTodolistAC(todolistTitle)

        dispatch(addTodolistAction)
        dispatch(addTodolistAction)

    }

    const deleteTodo = (todolistId: string) => {

        dispatch(removeTodolistAC(todolistId))
        dispatch(removeTodolistAC(todolistId))

    }

    const filterTasks = (value: Filter, todolistId: string) => {

        dispatch(changeTodolistFilterAC({todoId: todolistId, filterValue: value}))

    }

    const changeTodolistTitle = (title: string, todolistId: string) => {

        dispatch(changeTodolistTitleAC({todolistTitle: title, todoId: todolistId}))

    }

    const todolists = useSelector<RootState, TodolistType[]>((state)=>state.todolists)
    const items = useSelector<RootState, TodolistsItemsType>((state)=>state.tasks)

    const dispatch = useDispatch()


    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="">

                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton background={'tomato'}>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler} />
                        </div>
                    </Toolbar>
                </AppBar>

                <Box sx={{flexGrow: 1, m: '0 150px'}}>
                    <Grid container sx={{mb: '30px'}}>

                        <AddItemForm addCallback={addTodolist}/>

                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map((tl) => {

                                let filteredItems = items[tl.id]
                                if (tl.filter === 'completed') {
                                    filteredItems = filteredItems.filter(i => i.isDone)
                                }
                                if (tl.filter === 'active') {
                                    filteredItems = filteredItems.filter(i => !i.isDone)
                                }


                                return (
                                    <Grid>
                                        <Paper sx={{p: '0 20px 20px 20px'}}>
                                            <Todolist
                                                key={tl.id}
                                                todolistId={tl.id}
                                                addTask={addTask}
                                                tasks={filteredItems}
                                                title={tl.title}
                                                deleteTask={deleteTask}
                                                filterTask={filterTasks}
                                                changeTaskStatus={changeTaskStatus}
                                                filter={tl.filter}
                                                deleteTodolist={deleteTodo}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTodolistTitle={changeTodolistTitle}

                                            />
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )}
                    </Grid>
                </Box>
            </div>
        </ThemeProvider>
    );
}


export default AppWithRedux;

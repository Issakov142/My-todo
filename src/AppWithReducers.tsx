import React, {useReducer, useState} from 'react';
import './App.css';
import {Item, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    AppBar,
    Box,
    Container,
    createTheme,
    CssBaseline,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Grid2';
import {MenuButton} from './MenuButton';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './model/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './model/tasks-reducer';

export type Filter = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: Filter
}
type ThemeMode = 'dark' | 'light'
export type TodolistsItemsType = { [todolistId: string]: Item[] }


function AppWithReducers() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    const todolistId1 = v1()
    const todolistId2 = v1()




    const [items, dispatchToTasks] = useReducer(tasksReducer, {
            [todolistId1]: [{id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'Redux', isDone: true}],
            [todolistId2]: [{id: v1(), title: 'Mango', isDone: false},
                {id: v1(), title: 'Banana', isDone: true},
                {id: v1(), title: 'Qiwi', isDone: false},
                {id: v1(), title: 'Curcuma', isDone: true},
                {id: v1(), title: 'Basil', isDone: true},
                {id: v1(), title: 'Parsley', isDone: true},]
        }
    )



    const deleteTask = (id: string, todolistId: string) => {

        dispatchToTasks(removeTaskAC({taskId: id, todolistId}))

    }

    const addTask = (newTaskTitle: string, todolistId: string) => {

        dispatchToTasks(addTaskAC({title: newTaskTitle, todolistId}))

    }

    const changeTaskStatus = (taskId: string, value: boolean, todolistId: string) => {

        dispatchToTasks(changeTaskStatusAC({taskId, isDone: value, todolistId}))

    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {

        dispatchToTasks(changeTaskTitleAC({taskId, title, todolistId}))

    }



    const addTodolist = (todolistTitle: string) => {

        let addTodolistAction = addTodolistAC(todolistTitle)

        dispatchToTasks(addTodolistAction)
        dispatchToTodolists(addTodolistAction)

    }

    const deleteTodo = (todolistId: string) => {

        // const removeTodoAction = removeTodolistAC(todolistId)

        dispatchToTodolists(removeTodolistAC(todolistId))
        dispatchToTasks(removeTodolistAC(todolistId))

    }

    const filterTasks = (value: Filter, todolistId: string) => {

        dispatchToTodolists(changeTodolistFilterAC({todoId: todolistId, filterValue: value}))

    }

    const changeTodolistTitle = (title: string, todolistId: string) => {

        dispatchToTodolists(changeTodolistTitleAC({todolistTitle: title, todoId: todolistId}))

    }



    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

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


export default AppWithReducers;

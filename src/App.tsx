import React, {useState} from 'react';
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

export type Filter = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: Filter
}
type ThemeMode = 'dark' | 'light'
export type TodolistsItemsType = { [todolistId: string]: Item[] }


function App() {

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




    let [items, setItems] = useState<TodolistsItemsType>({
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
        let deletedItems = items[todolistId].filter((i) => i.id !== id)
        items[todolistId] = deletedItems
        setItems({...items})
    }

    const addTask = (newTaskTitle: string, todolistId: string) => {
        let newTask: Item = {id: v1(), title: newTaskTitle, isDone: false}
        let modifiedTodolist = [newTask, ...items[todolistId]]
        items[todolistId] = modifiedTodolist
        setItems({...items})

    }

    const changeTaskStatus = (taskId: string, value: boolean, todolistId: string) => {
        let task = items[todolistId].find((t) => t.id === taskId)
        if (task) {
            task.isDone = value
        }
        setItems({...items})
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        let task = items[todolistId].find((t) => t.id === taskId)
        if (task) {
            task.title = title
        }
        setItems({...items})
    }



    const addTodolist = (todolistTitle: string) => {
        const newTodolist: TodolistType = {id: v1(), title: todolistTitle, filter: 'all'}

        setItems({...items, [newTodolist.id]: []})
        setTodolists([newTodolist, ...todolists])
    }

    const deleteTodo = (todolistId: string) => {
        debugger
        let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId)
        setTodolists(filteredTodolists)

        delete items[todolistId]
        setItems({...items})
    }

    const filterTasks = (value: Filter, todolistId: string) => {
        let filteredTodo = todolists.find((tl) => tl.id === todolistId)
        if (filteredTodo) filteredTodo.filter = value
        setTodolists([...todolists])
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        let todolist = todolists.find((t) => t.id === todolistId)
        if (todolist) {
            todolist.title = title
        }
        setTodolists([...todolists])
    }



    const [todolists, setTodolists] = useState<Array<TodolistType>>([
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


export default App;

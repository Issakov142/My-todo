import React, {useState} from 'react';
import './App.css';
import {Item, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type Filter = 'all' | 'completed' | 'active'


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    type TodolistsItemsType = { [todolistId: string]: Item[] }


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

    const deleteTodo = (todolistId: string) => {
        debugger
        let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId)
        setTodolists(filteredTodolists)

        delete items[todolistId]
        setItems({...items})
    }

    const deleteTask = (id: string, todolistId: string) => {
        let deletedItems = items[todolistId].filter((i) => i.id !== id)
        items[todolistId] = deletedItems
        setItems({...items})
    }

    const addTask = (newTaskTitle: string, todolistId: string) => {
        let newTask: Item = {id: v1(), title: newTaskTitle, isDone: false}
        let modifiedTodolist = [newTask,...items[todolistId]]
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

    const filterTasks = (value: Filter, todolistId: string) => {
        let filteredTodo = todolists.find((tl) => tl.id === todolistId)
        if (filteredTodo) filteredTodo.filter = value
        setTodolists([...todolists])
    }

    const addTodolist = (todolistTitle: string) => {
        const newTodolist: Todolist = {id: v1(), title: todolistTitle, filter: 'all'}

        setItems({...items, [newTodolist.id]: []})
        setTodolists([newTodolist,...todolists])
    }

    type Todolist = {
        id: string
        title: string
        filter: Filter
    }

    const [todolists, setTodolists] = useState<Array<Todolist>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'},
    ])

    return (
        <div className="App">
            <AddItemForm addCallback={addTodolist}/>

            {todolists.map((tl) => {

                    let filteredItems = items[tl.id]
                    if (tl.filter === 'completed') {
                        filteredItems = filteredItems.filter(i => i.isDone)
                    }
                    if (tl.filter === 'active') {
                        filteredItems = filteredItems.filter(i => !i.isDone)
                    }


                    return (
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

                        />
                    )
                }
            )}
        </div>
    );
}


export default App;

import React, {useState} from 'react';
import './App.css';
import {Item, Todolist} from './Todolist';
import {v1} from 'uuid';

export type Filter = "all" | "completed" | "active"



function App() {

    let [items, setItems] = useState<Item[]>([
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "Redux", isDone: true}
    ])

    let [filter, setFilter] = useState<Filter>("all")


    const deleteTask = (id: string) => {
        items = items.filter((i) => i.id !== id)
        setItems(items)
        console.log(items)
    }

    const addTask = (newTaskTitle: string) => {
        let newTask:Item = {id: v1(), title: newTaskTitle, isDone: false}
        setItems([newTask,...items])

    }

    const filterTasks = (value: Filter) => {
        setFilter(value)
    }

    let filteredItems = items
    if (filter === "completed") {
        filteredItems = items.filter(i => i.isDone)
    }
    if (filter === "active") {
        filteredItems = items.filter(i => !i.isDone)
    }

    return (
        <div className="App">


            <Todolist addTask={addTask} tasks={filteredItems} title={'What to learn'} deleteTask={deleteTask} filterTask={filterTasks}/>
        </div>
    );
}


export default App;

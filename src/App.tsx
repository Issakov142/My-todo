import React, {useState} from 'react';
import './App.css';
import {Item, Todolist} from './Todolist';

export type Filter = "all" | "completed" | "active"



function App() {

    let [items, setItems] = useState<Item[]>([
        {id: 1, title: "CSS", isDone: false},
        {id: 2, title: "React", isDone: true},
        {id: 3, title: "JS", isDone: false},
        {id: 4, title: "Redux", isDone: true}
    ])

    let [filter, setFilter] = useState<Filter>("all")


    const deleteTask = (id: number) => {
        items = items.filter((i) => i.id !== id)
        setItems(items)
        console.log(items)
    }

    const filterTasks = (value: Filter) => {
        setFilter(value)
    }

    let filteredItems = items
    if (filter === "completed") {
        filteredItems = items.filter(i => i.isDone === true)
    }
    if (filter === "active") {
        filteredItems = items.filter(i => i.isDone !== true)
    }

    return (
        <div className="App">


            <Todolist tasks={filteredItems} title={'What to learn'} deleteTask={deleteTask} filterTask={filterTasks}/>
        </div>
    );
}


export default App;

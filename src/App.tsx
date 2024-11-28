import React from 'react';
import './App.css';
import {Item, Todolist} from './Todolist';

function App() {


    let items1: Item[] = [
        {id: 1, title: "CSS", isDone: false},
        {id: 2, title: "React", isDone: false},
        {id: 3, title: "JS", isDone: true}
    ]
    let items2: Item[] = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 2, title: "Gladiator", isDone: false},
        {id: 3, title: "Sultans", isDone: true}
    ]


    return (
        <div className="App">


            <Todolist items={items1} title={'What to learn'}/>
            <Todolist items={items2}   title={'Movies'}/>
        </div>
    );
}


export default App;

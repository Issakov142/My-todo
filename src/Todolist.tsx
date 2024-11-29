import React from 'react';
import {Filter} from './App';

export type Item = {
    id: number
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: Array<Item>
    deleteTask: (id: number) => void
    filterTask: (value: Filter) => void
}


export function Todolist(props: Props) {



    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={()=>{props.deleteTask(t.id)}}>x</button>
                    </li>
                )}

            </ul>
            <div>
                <button onClick={()=>{props.filterTask("all")}}>All</button>
                <button onClick={()=>{props.filterTask("active")}}>Active</button>
                <button onClick={()=>{props.filterTask("completed")}}>Completed</button>
            </div>


        </div>

    )
}
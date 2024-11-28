import React from 'react';

export type Item = {
    id: number
    title: string
    isDone: boolean
}

type Props = {
    title: string
    items: Array<Item>
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
                <li><input type="checkbox" checked={props.items[0].isDone}/><span>{props.items[0].title}</span></li>
                <li><input type="checkbox" checked={props.items[1].isDone}/><span>{props.items[1].title}</span></li>
                <li><input type="checkbox" checked={props.items[2].isDone}/><span>{props.items[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>


        </div>

    )
}
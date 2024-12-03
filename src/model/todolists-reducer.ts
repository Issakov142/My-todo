import {v1} from 'uuid';
import {Filter, TodolistType} from '../App';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        title: string
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        value: Filter
    }
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export let todolistId1 = v1()
export let todolistId2 = v1()

export const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'}

            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find((t) => t.id === action.payload.id)
            if (todolist) {
                todolist.title = action.payload.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let filteredTodo = state.find((tl) => tl.id === action.payload.id)
            if (filteredTodo) filteredTodo.filter = action.payload.value
            return state
        }
        default:
            throw new Error("I don't understand this action's type")
    }

}
export const removeTodolistAC = (todolistId1: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1,
        }
    } as const
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
        }
    } as const
}

export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            title: title,
            id: id
        }
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: Filter): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: id,
            value: filter
        }
    } as const
}
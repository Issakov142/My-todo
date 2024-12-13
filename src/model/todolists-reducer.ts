import {v1} from 'uuid';
import {Filter, TodolistType} from '../App';



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
            const newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}

            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find((t) => t.id === action.payload.todoId)
            if (todolist) {
                todolist.title = action.payload.todolistTitle
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let filteredTodo = state.find((tl) => tl.id === action.payload.todoId)
            if (filteredTodo) filteredTodo.filter = action.payload.filterValue
            return state
        }
        default:
            throw new Error("I don't understand this action's type")
    }

}

//Action Creators

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1,
        }
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
            id: v1()
        }
    } as const
}

export const changeTodolistTitleAC = (payload: {todolistTitle: string, todoId: string}) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload
    } as const
}
export const changeTodolistFilterAC = (payload: {todoId: string, filterValue: Filter}) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload
    } as const
}

//types for AC

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
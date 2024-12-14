import {v1} from 'uuid';
import {Filter, TodolistsItemsType, TodolistType} from '../app/App';
import {Item} from '../Todolist';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';


export const initialState: TodolistsItemsType = {}

export const tasksReducer = (state: TodolistsItemsType = initialState, action: ActionsType): TodolistsItemsType => {

    switch (action.type) {
        case 'REMOVE_TASK': {

            let deletedItems = state[action.payload.todolistId].filter((i) => i.id !== action.payload.taskId)
            state[action.payload.todolistId] = deletedItems

            return {...state}
        }
        case 'ADD_TASK': {
            let newTask: Item = {id: v1(), title: action.payload.title, isDone: false}
            let modifiedTodolist = [newTask, ...state[action.payload.todolistId]]
            state[action.payload.todolistId] = modifiedTodolist

            return {...state}
        }
        case 'CHANGE_TASK_STATUS': {
            let task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }

            return {...state}
        }
        case 'CHANGE_TASK_TITLE': {
            const {taskId, todolistId, title} = action.payload
            let task = state[todolistId].find((t) => t.id === taskId)
            if (task) {
                task.title = title
            }

            return {...state}
        }
        case 'REMOVE-TODOLIST': {
            delete state[action.payload.id]

            return {...state}
        }
        case 'ADD-TODOLIST': {

            return {...state, [action.payload.id]:[]}
        }

        default:
            return state
    }

}

//Action Creators

export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {
        type: 'REMOVE_TASK',
        payload: payload
    } as const
}
export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {
        type: 'ADD_TASK',
        payload: payload
    } as const
}
export const changeTaskStatusAC = (payload: {
    taskId: string,
    isDone: boolean,
    todolistId: string,
}) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: payload
    } as const
}

export const changeTaskTitleAC = (payload: {
    taskId: string,
    title: string,
    todolistId: string,
}) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: payload
    } as const
}


//types for AC

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
import type {Response} from 'common/types'
import {Todolist} from './todolistsApi.types';
import {instance} from 'common/instance';



export const todolistsApi = {
    getTodolists(){
        return instance.get<Todolist[]>('todo-lists')
    },
    createTodolist(title: string){
        return instance.post<Response<{ item: Todolist }>>('todo-lists', {title})
    },
    deleteTodolist(id: string){
        return instance.delete<Response>(`todo-lists/${id}`)
    },
    updateTodolistTitle (args: {id: string, title: string}){
        const {id, title} = args
        return instance.put<Response>(`todo-lists/${id}`, {title})
    }
}
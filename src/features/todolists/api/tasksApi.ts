import type {Response} from 'common/types'

import {GetTasksResponse, Task} from './tasksApi.types';
import axios from 'axios';
import {instance} from 'common/instance';


export const tasksApi = {
    getTasks(id: string){
        return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
    },
    createTask(args: {todolistId: string, title: string}){
        return instance.post<Response<{item: Task}>>(`todo-lists/${args.todolistId}/tasks`, {title: args.title})
    },
    deleteTask(args: {todolistId: string, taskId: string}){
        return instance.delete<Response>(`todo-lists/${args.todolistId}/tasks/${args.taskId}`)
    },
    changeTaskStatus(args: {task: Task, model: any}){
        return instance.put<Response<{item: Task}>>(`todo-lists/${args.task.todoListId}/tasks/${args.task.id}`, args.model,)
    },
    changeTaskTitle(args: {task: Task, model: any}){
        return instance.put<Response<{item: Task}>>(`todo-lists/${args.task.todoListId}/tasks/${args.task.id}`, args.model,)
    }

}
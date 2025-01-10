import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from 'common/components'
import {EditableSpan} from 'common/components'

import axios from 'axios';
import {Response} from 'common/types';
import {Todolist} from '../features/todolists/api/todolistsApi.types';
import {GetTasksResponse, Task} from '../features/todolists/api/tasksApi.types';
import {todolistsApi} from '../features/todolists/api/todolistsApi';
import {TaskStatus} from '../features/todolists/lib/enums/enums';
import {tasksApi} from '../features/todolists/api/tasksApi';

const apiKey = '3c5ddfbd-4db1-4a30-81df-35b5befd70c5'
const token = 'a45d82a8-cb88-40d6-b941-348ca42162b1'
const configs = {
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

    useEffect(() => {
        todolistsApi.getTodolists().then((res) => {
            setTodolists(res.data)
            res.data.forEach(({id}) => {
                tasksApi.getTasks(id).then((res) => {
                    console.log(res.data)

                    setTasks(state => ({...state, [id]: res.data.items}))
                })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolist(title).then((res) => {
            const newTodo = res.data.data.item
            setTodolists([newTodo, ...todolists])
        })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.deleteTodolist(id).then(() => {
            setTodolists(todolists.filter((tl) => tl.id !== id))
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolistTitle({id, title}).then(() => {
            setTodolists(todolists.map((tl) => tl.id === id ? {...tl, title} : tl))
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        tasksApi.createTask({title, todolistId}).then((res) => {
            const newTask = res.data.data.item
            const todoId = res.data.data.item.todoListId
            setTasks({...tasks, [todolistId]: [newTask, ...(tasks[todolistId] || [])]})
            // console.log(res)
        })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        tasksApi.deleteTask({taskId, todolistId}).then(() => {
            setTasks({...tasks, [todolistId]: [...tasks[todolistId].filter((t) => t.id !== taskId)]})
        })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task) => {

        const model = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
        }

        tasksApi.changeTaskStatus({task, model}).then((res) => {
            console.log(res.data)
            setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map((t)=>t.id === task.id ? {...t, status: model.status} : t)})
        })
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
        const model = {
            title: title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
        }

        tasksApi.changeTaskTitle({task, model}).then((res) => {
            console.log(res.data.data.item.title)
            setTasks({...tasks, [task.todoListId]: tasks[task.todoListId].map((t)=>t.id === task.id ? {...t, title: res.data.data.item.title} : t)})
        })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: Task) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
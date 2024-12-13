import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TodolistsItemsType, TodolistType} from '../App'
import {addTodolistAC, removeTodolistAC, todolistsReducer} from './todolists-reducer';

let startState: TodolistsItemsType

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('correct task should be deleted from correct array', () => {


    const endState = tasksReducer(startState, removeTaskAC({taskId: '2', todolistId: 'todolistId2'}))

    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false},
        ],
    })
    expect(endState['todolistId2'].every(t => t.id != "2")).toBeTruthy()
})

test('correct task should be added to correct array', () => {


    const endState = tasksReducer(startState, addTaskAC({title: 'juice', todolistId: 'todolistId2'}))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {


    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            taskId: '2',
            isDone: false,
            todolistId: 'todolistId2',
        })
    )

    expect(endState.todolistId2[1].isDone).toBe(false)
    expect(endState.todolistId1[1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {


    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({
            taskId: '3',
            title: 'F#',
            todolistId: 'todolistId1',
        })
    )

    expect(endState['todolistId1'][2].title).toBe('F#')
})

test('property with todolistId should be deleted', () => {


    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('new array should be added when new todolist is added', () => {


    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

// test('ids should be equals', () => {
//     const startTasksState: TodolistsItemsType = {}
//     const startTodolistsState: TodolistType[] = []
//
//     const action = addTodolistAC('new todolist')
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistsState[0].id
//
//     expect(idFromTasks).toBe(action.payload.id)
//     expect(idFromTodolists).toBe(action.payload.id)
// })
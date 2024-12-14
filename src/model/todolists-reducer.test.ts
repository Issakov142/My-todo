import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    initialState,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {TodolistType} from '../app/App';
import {v1} from 'uuid';

const todolistId1 = v1()
const todolistId2 = v1()
let startState: TodolistType[]


beforeEach(() => {
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})


test('correct todolist should be romoved', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be added', () => {

    const newTitle = 'New Todolist'

    const endState = todolistsReducer(initialState, addTodolistAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
})

test('correct todolist should change its name', () => {
    const newTitle = 'New Todolist'


    const endState = todolistsReducer(initialState, changeTodolistTitleAC({
        todolistTitle: newTitle,
        todoId: todolistId2
    }))

    expect(endState[1].title).toBe(newTitle)
    expect(endState[0].title).toBe('What to learn')
})

test('correct filter of todolist should be changed', () => {


    const newValue = 'completed' as const

    const endState = todolistsReducer(initialState, changeTodolistFilterAC({
        todoId: todolistId2,
        filterValue: newValue
    }))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newValue)

})
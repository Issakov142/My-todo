import React, {ChangeEvent} from 'react';
import {Filter} from './app/App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Box, Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles'

export type Item = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    todolistId: string
    title: string
    tasks: Array<Item>
    deleteTask: (id: string, todolistId: string) => void
    filterTask: (value: Filter, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, value: boolean, todolistId: string) => void
    filter: Filter
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}


export function Todolist(props: Props) {

    function onDeleteTodolistHandler() {
        props.deleteTodolist(props.todolistId)
    }

    const onAllClickHandler = () => {
        props.filterTask('all', props.todolistId)
    }
    const onActiveClickHandler = () => {
        props.filterTask('active', props.todolistId)
    }
    const onCompletedClickHandler = () => {
        props.filterTask('completed', props.todolistId)
    }

    const AddNewTaskTitleCallback = (value: string) => {
        props.addTask(value, props.todolistId)
    }

    const TodolistNewTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }

    return (
        <div>
            <h1><EditableSpan title={props.title} editableSpanCallback={TodolistNewTitleHandler}/>
                <IconButton onClick={onDeleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </h1>
            <AddItemForm addCallback={AddNewTaskTitleCallback}/>
            <List>
                {props.tasks.map((t) => {

                    const onDeleteClickHandler = () => {
                        props.deleteTask(t.id, props.todolistId)
                    }
                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                    }
                    const saveNewTaskTitleCallback = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todolistId)
                    }

                    return <ListItem key={t.id} sx={getListItemSx(t.isDone)}>
                        <div>
                            <Checkbox checked={t.isDone} onChange={onChangeCheckboxHandler}/>
                            <EditableSpan title={t.title} editableSpanCallback={saveNewTaskTitleCallback}/>
                        </div>
                            <IconButton onClick={onDeleteClickHandler}>
                                <DeleteIcon/>
                            </IconButton>
                    </ListItem>
                })}

            </List>
            <Box sx={filterButtonsContainerSx}>
                <Button color={'inherit'} variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </Box>
        </div>
    )
}


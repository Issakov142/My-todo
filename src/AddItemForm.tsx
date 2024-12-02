import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox'

type AddItemFormPropsType = {
    addCallback: (value: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newItemTitle, setNewItemTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onNewTaskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewItemTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addItem()
        }
    }

    function addItem() {
        if (newItemTitle.trim() !== '') {
            props.addCallback(newItemTitle.trim());
            setNewItemTitle('')
        } else {
            setError('Fielder is required')
        }
    }

    return (

            <div>
                <TextField
                    label={"Enter a title"}
                    variant={"outlined"}
                    size={"small"}
                    value={newItemTitle}
                    onChange={onNewTaskTitleChangeHandler}
                    onKeyDown={onKeyPressHandler}
                    error={!!error}
                    helperText={error}
                />
                <IconButton color={'primary'} onClick={addItem}>
                    <AddBoxIcon />
                </IconButton>
            </div>

    )
}
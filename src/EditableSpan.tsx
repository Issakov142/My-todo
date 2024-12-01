import React, {ChangeEvent,KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    editableSpanCallback: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>('')

    const onEditModeClickHandler = () => {
        setEditMode(true);
        setNewTitle(props.title)
    }
    const onEditModeBlurHandler = () => {
        setEditMode(false)
        props.editableSpanCallback(newTitle)
    }
    const onEditModeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onEditModePressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code == "Enter") {
            setEditMode(false)
            props.editableSpanCallback(newTitle)
        }
    }


    return editMode
        ? <input value={newTitle} onKeyDown={onEditModePressHandler} onBlur={onEditModeBlurHandler} onChange={onEditModeChangeHandler} autoFocus/>
        : <span onDoubleClick={onEditModeClickHandler}>{props.title}</span>
}
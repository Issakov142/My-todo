import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
        <>
            <div>
                <input className={error ? 'error' : ''} value={newItemTitle} onChange={onNewTaskTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addItem}>+
                </button>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
        </>
    )
}
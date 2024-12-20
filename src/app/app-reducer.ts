export const initialState = {
    themeMode: 'light' as ThemeMode
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {

    switch (action.type) {
        case 'CHANGE_THEME': {
            return {...state, themeMode: action.payload.theme}
        }

        default:
            return state
    }

}

//Action Creators

export const changeThemeAC = (theme: ThemeMode) => {
    return {
        type: 'CHANGE_THEME',
        payload: {theme}
    } as const
}


//types for AC

export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

type ActionsType = ChangeThemeActionType

export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState
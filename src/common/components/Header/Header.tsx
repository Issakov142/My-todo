import {AppBar, IconButton, Switch, Toolbar} from '@mui/material';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from '../MenuButton/MenuButton';
import {changeThemeAC} from '../../../app/app-reducer';
import {selectTheme} from '../../../app/app-selectors';
import {getTheme} from '../../theme/theme';

export const Header = () => {
    const themeMode = useAppSelector(selectTheme)

    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton background={'tomato'}>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>

    )
}
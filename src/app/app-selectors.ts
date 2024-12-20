import {RootState} from '../app/store';
import {ThemeMode} from './app-reducer';

export const selectTheme = (state: RootState): ThemeMode => state.app.themeMode
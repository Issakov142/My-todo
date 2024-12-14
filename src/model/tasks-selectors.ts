import {RootState} from '../app/store';
import {TodolistsItemsType} from '../app/App';

export const selectTasks = (state: RootState): TodolistsItemsType => state.tasks
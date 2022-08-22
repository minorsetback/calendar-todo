//Types
import { types } from './types';

export const todoActions = Object.freeze({
    setNewToDo: (data) => {
        return {
            type: types.SET_NEW_TODO,
            payload: data
        }
    },
    deleteToDo: (id) => {
        return {
            type: types.DELETE_TODO,
            payload: id
        }
    },
    editToDo: (id, data) => {
        return {
            type: types.EDIT_TODO,
            payload: { id: id, data: data }
        }
    }
})
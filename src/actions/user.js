import { ADD_NEW_USER, DELETE_USER, RESET_EDIT_MODE, SET_EDIT_MODE, UPDATE_USER } from "./crudAction"

export const addNewUser = (user) => {
    return {
        type: ADD_NEW_USER,
        value: { ...user }
    }
}

export const setEditMode = (index) => {
    return {
        type: SET_EDIT_MODE,
        value: index
    }
}

export const resetEditMode = () => {
    return {
        type: RESET_EDIT_MODE
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        value: { ...user }
    }
}

export const deleteUser = (index) => {
    return {
        type: DELETE_USER,
        value: index
    }
}


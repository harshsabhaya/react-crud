import { ADD_NEW_USER, DELETE_USER, RESET_EDIT_MODE, SET_EDIT_MODE, UPDATE_USER } from "../actions/crudAction"


const DEFAULT_SETTING = {
    userList: [],
    isEditMode: false,
    editIndex: null
}

const rootReducer = (state = DEFAULT_SETTING, action) => {
    switch (action.type) {
        case ADD_NEW_USER:
            return {
                ...state,
                userList: [...state.userList, { ...action.value }]
            }

        case SET_EDIT_MODE:
            return {
                ...state,
                isEditMode: true,
                editIndex: action.value
            }

        case RESET_EDIT_MODE:
            return {
                ...state,
                isEditMode: false,
                editIndex: null
            }
        case UPDATE_USER:
            const lists = [...state.userList]
            lists.splice(state.editIndex, 1, action.value)
            return {
                ...state,
                userList: lists
            }

        case DELETE_USER:
            const data = [...state.userList]
            data.splice(action.value, 1)
            return {
                ...state,
                userList: data
            }
        default:
            return state
    }
}

export default rootReducer;
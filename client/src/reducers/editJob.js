const initialState = {
    id: '',
    name: '',
    title: "",
    description: "",
    scope: "Health",
    type: "Partime",
    duedate: ""
}

const changeJobpostingform = (state = initialState, action) => {
    switch (action.type) {
        case 'EditJob':

            return {
                ...state,

                id: action.payload._id,
                name: action.payload.name,
                title: action.payload.title,
                description: action.payload.description,
                scope: action.payload.scope,
                type: action.payload.type,
                duedate: action.payload.duedate



            }
        case 'PostJob': {
            state = initialState
            return state
        }
        default:
            {
                return state
            }
    }
}
export default changeJobpostingform;
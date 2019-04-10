const initialState = {
    auth: false
}

const auth = (state = initialState, action) => {
    switch(action.type) {
        case "SET_AUTH":
            return {
                ...state,
                auth: action.payload
            };

        default:
            return state
    }
}

export default auth
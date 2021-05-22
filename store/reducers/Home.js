import { SAVE_MESSAGE } from "../actions/Home";

const initialState = {
    messageSubmitInfo: null
}

export default (state = initialState, { type, messageSubmitResponse }) => {
    switch (type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messageSubmitInfo: messageSubmitResponse
            }
        default:
            return state;
    }
}
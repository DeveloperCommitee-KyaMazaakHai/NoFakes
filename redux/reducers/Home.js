import { SAVE_MESSAGE } from "../actions/Home";

const initialState = {
    messageSubmitInfo: null
}

export default (state = initialState, { type, messageSubmitResponse }) => {
    switch (type) {
        case SAVE_MESSAGE:
            console.log("messageSubmitResponse: ", messageSubmitResponse)
            return {
                ...state,
                messageSubmitInfo: messageSubmitResponse
            }
        default:
            return state;
    }
}
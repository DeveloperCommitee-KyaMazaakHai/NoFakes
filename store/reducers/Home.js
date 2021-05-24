import { SAVE_MESSAGE, CALCULATE_RESULT } from "../actions/Home";

const initialState = {
    messageSubmitInfo: null,
    calculateResultInfo: null
}

export default (state = initialState, { type,
    messageSubmitResponse, calculateResultResponse }) => {
    switch (type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messageSubmitInfo: messageSubmitResponse
            }
        case CALCULATE_RESULT:
            return {
                ...state,
                calculateResultInfo: calculateResultResponse
            }
        default:
            return state;
    }
}
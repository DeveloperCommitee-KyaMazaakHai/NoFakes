import api from '../../config/api';

export const SAVE_MESSAGE= 'SAVE_MESSAGE';
export const CALCULATE_RESULT= 'CALCULATE_RESULT';

export const saveMessage = (messageObj) => async (dispatch) => {
    try {
        const messageResponse = await fetch(`${api.messageUrl}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "msgContent": messageObj.msgContent,
                "uploadIP": messageObj.uploadIP,
                "uploadEmail": messageObj.uploadEmail
            })
        })

        if (!messageResponse?.ok) {
            throw new Error('Something went wrong!');
        }

        const messageResponseData = await messageResponse.json();
        let statusMessage = "";

        if (messageResponseData.status === 200 || messageResponseData.status === 201) {
            statusMessage = "Thank you for your contribution. We have recorder your message."
        } else if (messageResponseData.status === 202 || messageResponseData.status === 203) {
            statusMessage = "You have already uploaded this message."
        } else if (messageResponseData.status === 400) {
            statusMessage = "There was an error in recording your message. Please try again." + messageResponseData.message
        }

        dispatch({
            type: SAVE_MESSAGE,
            messageSubmitResponse: statusMessage
        });
    } catch(err) {
        throw new Error(err.message);
    }
};

export const calculateResult = (message) => async (dispatch) => {
    try {
        const resultResponse = await fetch(`${api.resultUrl}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "message": message,
            })
        }).then((result) => {
            if (result.ok) {
                return result;
            }
        }).catch((err) => {
            console.log(err);
        });

        if (!resultResponse?.ok) {
            throw new Error('Something went wrong!');
        }

        const resultResponseData = await resultResponse.json();
        let resultMessage = "";

        if (resultResponseData.status === 200) {
            resultMessage = resultResponseData.result;
        } else if (resultResponseData.status === 400) {
            resultMessage = "There was an error in calculating the result. Please try again."
        }

        dispatch({
            type: CALCULATE_RESULT,
            calculateResultResponse: resultMessage
        });
    } catch(err) {
        throw new Error(err.message);
    }
};
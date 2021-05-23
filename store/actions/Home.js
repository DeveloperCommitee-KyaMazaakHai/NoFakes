import api from '../../config/api';

export const SAVE_MESSAGE= 'SAVE_MESSAGE';

export const saveMessage = (messageObj) => async (dispatch) => {
    try {
        console.log("message obj: " + JSON.stringify(messageObj));
        const messageResponse = await fetch(`${api.messageUrl}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "msgContent": messageObj.message,
                "uploadIP": messageObj.uploadIP,
                "uploadEmail": messageObj.uploadEmail
            })
        }).then((result) => {
            if (result.ok) {
                return result;
            }
        }).catch((err) => {
            console.log(err);
        });

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
            statusMessage = "There was an error in recording your message. Please try again."
        }

        dispatch({
            type: SAVE_MESSAGE,
            messageSubmitResponse: statusMessage
        });
    } catch(err) {
        throw new Error(err.message);
    }
};
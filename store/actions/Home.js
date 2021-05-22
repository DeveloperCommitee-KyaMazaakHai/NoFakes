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
        console.log("message response data: " + JSON.stringify(messageResponseData));
        let statusMessage = "Message successfully submitted";

        // if (messageResponseData.status === 201) {
        //
        // } else if (messageResponseData.status === 202) {
        //
        // } else if (messageResponseData.status === 203) {
        //
        // } else if (messageResponseData.status === 200) {
        //
        // } else if (messageResponseData.status === 400) {
        //
        // }

        dispatch({
            type: SAVE_MESSAGE,
            project: statusMessage
        });
    } catch(err) {
        throw new Error(err.message);
    }
};
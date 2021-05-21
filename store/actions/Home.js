import api from '../../config/api';

export const SAVE_MESSAGE= 'SAVE_MESSAGE';

export const saveMessage = (messageObj) => async (dispatch) => {
    try {
        console.log("message obj: " + JSON.stringify(messageObj));
        const messageResponse = await fetch(`${api.messageUrl}`, {
            method: 'POST',
            body: JSON.stringify({
                "message": messageObj.message,
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

        // dispatch({
        //     type: SAVE_MESSAGE,
        //     project: messageResponseData
        // });
    } catch(err) {
        throw new Error(err.message);
    }
};
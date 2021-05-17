const e = require('cors')
const Message = require('../models/messages')
const MessageServices = require( '../utils/services/messages')
const Hit = require('../models/hits')
const HitServices = require('../utils/services/hits')

module.exports = (app) => {
    if(app === null){
        throw new Error('app must be instance of an express server')
    }

    app.get('/api/messages', async(req,res) => {
        var { ...ob} = req.query
        try{
            var messages = await MessageServices.getMessages({...ob})
            return res.status(200).json({
                status: 200,
                message: "Messages Found",
                messages: messages
            })
        }catch(e){
            return res.status(200).json({
                status: 400,
                message: "Error: "+ e
            })
        }
    })

    app.post('/api/messages', async(req, res) => {
        var { ...ob } = req.body
        message = Message({...ob})
        try {
            const existingMsgs = await MessageServices.getMessages({msgContent: message.msgContent})
            if(existingMsgs.length > 0){
                firstMsg = existingMsgs[0]
                if(firstMsg.uploadIP == message.uploadIP || (firstMsg.uploadEmail && firstMsg.uploadEmail == message.uploadEmail) || (firstMsg.uploadPhone && firstMsg.uploadPhone == message.uploadPhone) ){
                    return res.status(200).json({
                        status: 200,
                        message: "Err: User has already uploaded the same message"
                    })
                }else{
                    if(await HitServices.didUserHit(message.uploadIP, message.uploadPhone, message.uploadEmail, firstMsg._id)){
                        return res.status(200).json({
                            status: 401,
                            message: "Error: Message exists and User has already hit"
                        })
                    }else{
                        const hit = HitServices.getHitFromMsg(firstMsg._id, message)
                        console.log("Hit: "+ hit)
                        const savedHit = await HitServices.saveHit(hit)
                        const savedMessage = await MessageServices.updateMessage(firstMsg._id, savedHit._id,{})
                        return res.status(200).json({
                            status: 200,
                            message: "Message exists, created hit",
                            savedHit: savedHit,
                            savedMessage: savedMessage
                        })
                    }
                }
                
            }else{
                const savedMessage = await MessageServices.saveMessage(message)
                return res.status(200).json({
                    status: 200,
                    message: "New Message Created Successfully",
                    savedMessage: savedMessage
                })
            }
            
        }catch(err){
            return res.status(200).json({
                status: 400,
                message: "Error: " + err
            })
        }
    })

    app.delete('/api/messages', async(req, res) => {
        var {_id} = req.body
        try{
            const deletedMessage = await MessageServices.deleteMessage(_id)
            return res.status(200).json({
                status: 200,
                message: "Message Deleted Successfully",
                deletedMessage: deletedMessage
            })
        }catch(err){
            return res.status(200).json({
                status: 400,
                message: "Error deleting message: "+ err
            })
        }
    })

    app.put('/api/messages', async(req, res) => {
        var { _id, hitIDs, ...ob} = req.body
        try{
            const updatedMessage = await MessageServices.updateMessage(_id, hitIDs, {...ob})
            return res.status(200).json({
                status: 200,
                message: "Message updated successfully",
                updatedMessage: updatedMessage
            })
        }catch(err){
            return res.status(200).json({
                status: 400,
                message: "Error updating project: "+ err
            })
        }
    })
}
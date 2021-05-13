const e = require('cors')
const Message = require('../models/messages')

module.exports = (app) => {
    if(app === null){
        throw new Error('app must be instance of an express server')
    }

    app.get('/api/messages', (req,res) => {
        var { ...ob} = req.query
        Message.find({...ob}, (err, messages) => {
            if(err || messages === null){
                return res.status(200).json({
                    status: 400,
                    message: "Error: No Messages/Error fetching Messages"
                })
            }else{
                return res.status(200).json({
                    status: 200,
                    message: "Messages found",
                    messages: messages
                })
            }
        })
    })

    app.post('/api/messages', (req, res) => {
        var { ...ob } = req.body
        message = Message({...ob})
        message.save((err, savedMessage)=> {
            if(err){
                return res.status(200).json({
                    status: 400,
                    message: "Error: " + err
                })
            }else{
                return res.status(200).json({
                    status: 200,
                    message: "New Message Created Successfully",
                    savedMessage: savedMessage
                })
            }
        })
    })

    app.delete('/api/messages', (req, res) => {
        var _id = req.query
        if(! _id){
            return res.status(200).json({
                status: 400,
                message: "Error deleting message: Message id is required"
            })
        }else{
            Message.findOneAndDelete(_id, (err, deletedMessage) => {
                if(err){
                    return res.status(200).json({
                        status: 400,
                        message: "Error deleting message: "+ err
                    })
                }else{
                    return res.status(200).json({
                        status: 200,
                        message: "Message Deleted Successfully",
                        deletedMessage: deletedMessage
                    })
                }
            })
        }
    })

    app.put('/api/messages', (req, res) => {
        var { _id, hitIDs, ...ob} = req.body
        if(! _id){
            return res.status(200).json({
                status: 400,
                message: "Error editing message: message ID is required"
            })
        }else{
            Message.findOneAndUpdate(_id, {$push: {hitIDs: hitIDs} , $set: {...ob}}, {new: true}, (err, updatedMessage1) => {
                if(err){
                    return res.status(200).json({
                        status: 400,
                        message: "Error updating project: "+ err
                    })
                }else{
                    return res.status(200).json({
                        status: 200,
                        message: "Message updated successfully",
                        updatedMessage: updatedMessage1
                    })
                }
            })
        }
    })
}
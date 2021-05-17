const Message = require('../../models/messages')
const e = require('cors');
async function getMessages({...ob}){
    try{
        const messages = await Message.find({...ob}).exec()
        return messages;
    }catch(errors){
        throw errors;
    }
}

async function saveMessage(message){
    try{
        const savedMessage = await message.save()
        return savedMessage
    }catch(errors){
        throw errors
    }
}

async function deleteMessage(_id){
    if(!_id){
        throw "Please Supply Message ID to Delete"
    }
    try{
        const deletedMessage = await Message.findOneAndDelete({_id}).exec()
        return deletedMessage
    }catch(errors){
        throw errors
    }
}


async function updateMessage(_id, hitIDs, {...ob}){
    if(!_id){
        throw "Please Supply Message ID to Update"
    }
    try{
        const updatedMessage = await Message.findOneAndUpdate({_id}, {$addToSet: {hitIDs: hitIDs} , $set: {...ob}}, {new: true}).exec()
        return updatedMessage
    }catch(errors){
        throw errors
    }
}

module.exports = { getMessages, saveMessage, deleteMessage, updateMessage }


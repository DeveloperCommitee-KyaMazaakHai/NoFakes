const Hit = require('../../models/hits')
const Message = require('../../models/messages')
const MessageServices = require('../../utils/services/messages')

async function getHits({...ob}){
    try{
        const hits = await Hit.find({...ob}).exec()
        return hits;
    }catch(errors){
        throw errors;
    }
}

async function saveHit(hit){
    try{
        const savedHit = await hit.save()
        return savedHit
    }catch(errors){
        throw errors
    }
}

async function deleteHit(_id){
    if(!_id){
        throw "Please Supply Hit ID to Delete"
    }
    try{
        const deletedHit = await Hit.findOneAndDelete({_id}).exec()
        return deletedHit
    }catch(errors){
        throw errors
    }
}

async function updateHit(_id, {...ob}){
    if(!_id){
        throw "Please Supply Hit ID to Update"
    }
    try{
        const updatedHit = await Hit.findOneAndUpdate({_id}, {...ob}, {new: true}).exec()
        return updatedHit
    }catch(errors){
        throw errors
    }
}

function getHitFromMsg(msgID, message){
    return Hit({
        msgID: msgID,
        hitIP: message.uploadIP,
        hitPhone: message.uploadPhone,
        hitEmail: message.uploadEmail
    })
}

async function didUserHit(IP,Phone, Email, msgID){
    try {
        var message = await Message.find({_id: msgID}).select('hitIDs').exec()
        message = message[0]
        var hitIDs =  message.hitIDs
        console.log("messages: "+message)
        console.log("hitIDs: "+hitIDs)
        Phone = Phone? Phone : ""
        Email = Email? Email : ""
        console.log(Phone + Email+IP)
        if(hitIDs){
            const hits = await Hit.find({
                $and: [
                    {_id: { $in: hitIDs }},
                    { $or: [{hitIP: IP}, {hitPhone: Phone}, {hitEmail: Email}]}
                ]
            }).exec()
            console.log("hits: "+hits)
            if(!hits || hits.length==0){
                return false
            }else{
                return true
            }
        }else{
            return false
        }
    }catch(errors){
        throw errors
    }
}

module.exports = { getHits, saveHit, deleteHit, updateHit, getHitFromMsg, didUserHit }
const mongoose = require('mongoose')
const schema = mongoose.Schema

const MessageSchema = new schema({
	msgContent: {type: String, required: true},
	uploadTime: {type: Date, required: true, default: Date.now},
	uploadIP: {type: String, required: true},
	uploadPhone: {type: String},
	uploadEmail: {type: String},
	hitIDs: {type: [String]},
	embeddings: {type: [Double]}
})

module.exports = mongoose.model('Message', MessageSchema, 'Messages')
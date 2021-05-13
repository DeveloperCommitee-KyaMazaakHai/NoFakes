const mongoose = require('mongoose')
const schema = mongoose.Schema

const HitSchema = new schema({
	msgID: {type: String, required: true},
	hitIP: {type: String, required: true},
	uploadTime: {type: Date, required: true, default: Date.now},
	hitPhone: {type: String},
	hitEmail: {type: String}
})

module.exports = mongoose.model('Hit', HitSchema, 'Hits')
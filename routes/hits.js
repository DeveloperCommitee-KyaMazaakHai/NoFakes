const Hit = require('../models/hits')
const HitServices = require('../utils/services/hits')

module.exports = (app) => {
    if(app === null){
        throw new Error('app must be instance of an express server')
    }

    app.get('/api/hits', async(req, res) => {
        var {...ob} = req.query
        try{
            const hits = await HitServices.getHits({...ob})
            return res.status(200).json({
                status: 200,
                message: "Hits found",
                hits: hits
            })
        }catch(err){
            return res.status(200).json({
                status: 400,
                message: "Error: " + err
            })
        }
    })

    app.post('/api/hits', async(req, res) => {
        var {...ob} = req.body
        hit = Hit({...ob})
        try{
            const savedHit = await HitServices.saveHit(hit)
            return res.status(200).json({
                status: 200,
                message: "New Hit Created Successfully",
                savedHit: savedHit
            })
        }catch(err){
            return res.status(200).json({
                status: 400,
                message: "Error: " + err
            })
        }
    })

    app.delete('/api/hits', async(req, res) => {
        var {_id} = req.body
        try{
            const deletedHit = await HitServices.deleteHit(_id)
            return res.status(200).json({
                status: 200,
                message: "Hit Deleted Successfully",
                deletedHit: deletedHit
            })
        }catch(err){
            return res.status(200).json({
                status: 400,
                nessage: "Error deleting hit: "+ err
            })
        }
    })

    app.put('/api/hits', async(req, res) => {
        var { _id, ...ob} = req.body
        try{
            const updatedHit = await HitServices.updateHit(_id, {...ob})
            return res.status(200).json({
                status: 200,
                message: "Hit updated successfully",
                updatedHit: updatedHit
            })
        }catch(err){
            return res.status(200).json({
                status: 400,
                message: "Error updating hit: "+ err
            })
        }
    })
}
const Hit = require('../models/hits')

module.exports = (app) => {
    if(app === null){
        throw new Error('app must be instance of an express server')
    }

    app.get('/api/hits', (req, res) => {
        var {...ob} = req.query
        Hit.find({...ob}, (err, hits) => {
            if(err || hits === null){
                return res.status(200).json({
                    status: 400,
                    message: "Error: No Hits/Error fetching hits"
                })
            }else{
                return res.status(200).json({
                    status: 200,
                    message: "Hits found",
                    hits: hits
                })
            }
        })
    })

    app.post('/api/hits', (req, res) => {
        var {...ob} = req.body
        hit = Hit({...ob})
        hit.save((err, savedHit) => {
            if(err){
                return res.status(200).json({
                    status: 400,
                    message: "Error: " + err
                })
            }else{
                return res.status(200).json({
                    status: 200,
                    message: "New Hit Created Successfully",
                    savedHit: savedHit
                })
            }
        })
    })

    app.delete('/api/hits', (req, res) => {
        var _id = req.query
        if(! _id){
            return res.status(200).json({
                status: 400,
                message: "Error deleting Hit: Hit Id is required"
            })
        }else{
            Hit.findOneAndDelete( _id, (err, deletedHit) => {
                if(err){
                    return res.status(200).json({
                        status: 400,
                        nessage: "Error deleting hit: "+ err
                    })
                }else{
                    return res.status(200).json({
                        status: 200,
                        message: "Hit Deleted Successfully",
                        deletedHit: deletedHit
                    })
                }
            })
        }
    })

    app.put('/api/hits', (req, res) => {
        var { _id, ...ob} = req.body
        if(! _id){
            return res.status(200).json({
                status: 400,
                message: "Error editing hit: hit ID is required"
            })
        }else{
            Hit.findOneAndUpdate({_id}, {...ob}, {new: true}, (err, updatedHit) => {
                if(err){
                    return res.status(200).json({
                        status: 400,
                        message: "Error updating hit: "+ err
                    })
                }else{
                    return res.status(200).json({
                        status: 200,
                        message: "Hit updated successfully",
                        updatedHit: updatedHit
                    })
                }
            })
        }
    })
}
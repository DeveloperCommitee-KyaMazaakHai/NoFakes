const e = require('cors')


module.exports = (app) => {
    if(app === null){
        throw new Error('app must be instance of an express server')
    }

    app.post('/api/checkFake', (req, res) => {
        var { msgContent } = req.body

        //return (float) checkIfFake()

    })


}
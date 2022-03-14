require('dotenv').config()

const cors  = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())

const carRouter = require('./routes/cars')
const parkingEntryRouter = require('./routes/parkingEntries')
const parkingSlotRouter = require('./routes/parkingSlots')
const parkingSpaceRouter = require('./routes/parkingSpaces')
app.use('/cars', carRouter)
app.use('/parking-entries', parkingEntryRouter)
app.use('/parking-slots', parkingSlotRouter)
app.use('/parking-spaces', parkingSpaceRouter)


// const server = http.createServer((req, res) => {
//     if(req.url === '/api/cars' && req.method === 'GET') {
//         getCars(req, res)
//     } else if(req.url.match(/\/api\/cars\/\w+/) && req.method === 'GET') {
//         const id = req.url.split('/')[3]
//         getCar(req, res, id)
//     } else if(req.url === '/api/cars' && req.method === 'POST') {
//         createCar(req, res)
//     } else if(req.url.match(/\/api\/cars\/\w+/) && req.method === 'PUT') {
//         const id = req.url.split('/')[3]
//         updateCar(req, res, id)
//     } else if(req.url.match(/\/api\/cars\/\w+/) && req.method === 'DELETE') {
//         const id = req.url.split('/')[3]
//         deleteCar(req, res, id)
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' })
//         res.end(JSON.stringify({ message: 'Route Not Found' }))
//     }
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started Port: ${PORT}`))

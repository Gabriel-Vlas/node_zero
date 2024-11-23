import {fastify} from "fastify"
//import {dataBaseMemory} from './dataBaseMemory.js'
import { dataBasePostgre } from "./dataBasePostgre.js"

const server = fastify()

//const dataBase = new dataBaseMemory()
const dataBase = new dataBasePostgre()

server.post('/videos', async(request, reply) => {

    const {title, description, duration } = request.body

    await dataBase.create({
        title: title,
        description: description,
        duration: duration,
    })

    console.log(dataBase.list())

    return reply.status(201).send()
})

server.get('/videos', async(request) => {

    const search = request.query.search

    console.log(search)

    const videos = await dataBase.list(search)
    return videos
})

server.put('/videos/:id', async (request, reply) => {
    
    const videosId = request.params.id
    
    const {title, description, duration } = request.body

    await dataBase.update(videosId, {
        title,
        description,
        duration,
    })
    console.log("UPDATE")
    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    
    const videosId = request.params.id
    
    await dataBase.delete(videosId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.port ?? 3333,
})
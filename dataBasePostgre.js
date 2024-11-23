import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class dataBasePostgre{
    #videos = new Map()

    async list(search){
        
        let videos

        if(search){
            videos = await sql`SELECT * FROM VIDEOS WHERE TITLE ILIKE ${'%' + search + "%"}`
        } else{
            videos = await sql`SELECT * FROM VIDEOS`
        }

        return videos
    }

    async create(videos){
        const videoId = randomUUID()

        const {title, description, duration} = videos

        await sql`INSERT INTO VIDEOS (id, title, description, duration) VALUES (${videoId},${title},${description},${duration})`
    }

    async update(id, videos){
        const {title, description, duration} = videos

        await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id){
        await sql`DELETE FROM videos WHERE id = ${id}` 
    }
}
import { MongoClient } from "mongodb"
import dns from 'dns'

// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const url = "mongodb+srv://admin:Test12345@cluster0.nukjaq3.mongodb.net/?appName=Cluster0"
// "mongodb+srv://admin:<db_password>@cluster0.nukjaq3.mongodb.net/?appName=Cluster0"
const dbName = "node-project"
export const collectionName = "todo"
const client = new MongoClient(url)

export const connection = async () => {
    const connect = await client.connect()
    return await  connect.db(dbName)
}
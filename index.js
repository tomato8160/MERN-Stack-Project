import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

// 환경변수 불러오기
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEW_DB_URI,{
        maxPoolSize:50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }

).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    app.listen(port, ()=>{
        console.group(`listening on port ${port}`)
    })
})
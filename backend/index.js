import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewDAO from "./dao/reviewsDAO.js"

// 환경변수 불러오기
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

// Connect DB
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

    // restaurants DB 커넥션 객체 생성
    await RestaurantsDAO.injectDB(client)

    // review DB 커넥션 객체 생성
    await ReviewDAO.injectDB(client)

    // Open Server
    app.listen(port, ()=>{
        console.group(`listening on port ${port}`)
    })
})
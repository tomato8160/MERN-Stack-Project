import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews
export default class ReviewsDAO{
    // CONNECTION
    static async injectDB(conn){
        if(reviews){
            return
        }
        try{
            // reviews DB 커넥션 객체 생성
            reviews = await conn.db(process.env.RESTREVIEW_NS).collection("review")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in retaurantsDAO: ${e}`,
            )
        }
    }

    // CREATE
    static async addReview(restaurantId, user, review, date){
        try{
            const reviewDoc = {
            name: user.name,
            user_id: user._id,
            date: date,
            text: review,
            restaurant_id: ObjectId(restaurantId)}

            // insertOne : 삽입
            return await reviews.insertOne(reviewDoc)
            
        }catch(e){
            console.error(`Unable to post review: ${e}`)
            return {error:e}
        }
    }

    // UPDATE
    static async updateReview(reviewId, userId, text, date){
        try{

            // updateOne : 업데이트
            const updateResponse = await review.updateOne(
                {user_id: userId, _id: ObjectId(reviewId)},
                {$set: { text: text, date: date}},
            )
            return updateResponse
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return {error:e}
        }
    }

    // DELETE
    static async deleteReview(reviewId, userId){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            })
            
            return deleteResponse
        }catch(e){
            console.error(`Unable to delete review: ${e}`)
            return {error:e}
        }
    }
}
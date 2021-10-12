let restaurants

export default class RestaurantsDAO{
    static async injectDB(conn){
        if(restaurants){
            return
        }
        try{
            restaurants = await conn.db(process.env.RESTREVIEW_NS).collection("restaurants")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in retaurantsDAO: ${e}`,
            )
        }
    }
}


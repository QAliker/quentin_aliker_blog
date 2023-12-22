import BaseModel from "@/db/models/BaseModel"

class PostsModel extends BaseModel {
    static tableName = "posts"
    // faire la future relation avec le user quand on les aura
    // static get relationMappings() {
    //     return {
            
    //     }
    // }
}

export default PostsModel
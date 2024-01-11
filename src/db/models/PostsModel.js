import BaseModel from "@/db/models/BaseModel"
import UserModel from "./UserModel"

class PostsModel extends BaseModel {
    static tableName = "posts"
    static get relationMappings() {
        return {
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: "posts.user_id",
                    to: "users.id",
                },
            },
        }
    }
}

export default PostsModel
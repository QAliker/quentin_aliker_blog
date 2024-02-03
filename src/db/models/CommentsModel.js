import BaseModel from "@/db/models/BaseModel"
import UserModel from "./UserModel"
import PostsModel from "./PostsModel"

class CommentsModel extends BaseModel {
    static tableName = "comments"
    static get relationMappings() {
        return {
            user: {
                relation: BaseModel.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: "comments.user_id",
                    to: "users.id",
                },
            },
            // Post: {
            //     relation: BaseModel.HasManyRelation,
            //     modelClass: PostsModel,
            //     join: {
            //         from: "comments.post_id",
            //         to: "posts.id",
            //     },
            // },
        }
    }
}

export default CommentsModel
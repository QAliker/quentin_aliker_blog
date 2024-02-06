import BaseModel from "@/db/models/BaseModel"
import UserModel from "./UserModel"
import CommentsModel from "./CommentsModel"

class PostsModel extends BaseModel {
    static tableName = "posts"
    static get relationMappings() {
        return {
            user: {
                relation: BaseModel.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: "posts.userId",
                    to: "users.id",
                },
            },
            comments: {
                relation: BaseModel.HasManyRelation,
                modelClass: CommentsModel,
                join: {
                    from: "posts.id",
                    to: "comments.postId",
                },
            }
        }
    }
}

export default PostsModel
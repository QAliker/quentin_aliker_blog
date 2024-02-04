import BaseModel from "@/db/models/BaseModel"
import UserModel from "./UserModel"

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
        }
    }
}

export default CommentsModel

import { Model } from "objection";
import { IUser } from "../../domain/IUser";
import bcrypt from 'bcryptjs';
import DepartmentModel from "./DepartmentModel";

interface UserModel extends IUser { }

class UserModel extends Model {
    static get tableName() {
        return 'user';
    }

    $beforeInsert(): void {
        this.password = bcrypt.hashSync(this.password, 10)
    }

    static get relationMappings() {
        return {
            department: {
                relation: Model.HasOneRelation,
                modelClass: DepartmentModel,
                join: {
                    from: 'user.departmentId',
                    to: 'department.id'
                }
            }
        }
    }
}

export default UserModel

import { Model } from "objection";
import { IDepartment } from "../../domain/IDepartment";

interface DepartmentModel extends IDepartment { }

class DepartmentModel extends Model {
    static get tableName() {
        return 'department';
    }

    $beforeInsert(): void {
    }
}

export default DepartmentModel

import { Model } from "objection";
import { IDepartment } from "../../domain/IDepartment";

interface DepartmentEmployeesModel extends IDepartment { }

class DepartmentEmployeesModel extends Model {
    static get tableName() {
        return 'department_employees';
    }

    $beforeInsert(): void {
    }
}

export default DepartmentEmployeesModel
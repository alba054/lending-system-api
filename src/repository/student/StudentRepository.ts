import { StudentEntity } from "../../entity/student/StudentEntity";

export abstract class StudentRepository {
  abstract getStudentByStudentId(
    studentId: string
  ): Promise<StudentEntity | null>;
}

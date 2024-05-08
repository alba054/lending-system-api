import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { StudentEntity } from "../../entity/student/StudentEntity";
import { StudentRepository } from "./StudentRepository";

export class StudentPrismaRepositoryImpl extends StudentRepository {
  async getStudentByStudentId(
    studentId: string
  ): Promise<StudentEntity | null> {
    const student = await prismaDb.db?.student.findUnique({
      where: {
        studentId,
      },
    });

    if (!student) {
      return null;
    }

    return new StudentEntity(student.name ?? "", student.studentId, {
      id: student.id,
    });
  }
}

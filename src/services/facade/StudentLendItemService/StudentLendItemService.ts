import { StudentLendItemRepository } from "../../../repository/facade/StudentLendItemRepository/StudentLendItemRepository";
import { StudentRepository } from "../../../repository/student/StudentRepository";
import { IPostLentItemPayload } from "../../../utils/interfaces/request/IPostLentItemPayload";

export abstract class StudentLendItemService {
  protected studentLendItemRepository: StudentLendItemRepository;
  protected studentRepository: StudentRepository;

  constructor(repository: {
    studentLendItemRepository: StudentLendItemRepository;
    studentRepository: StudentRepository;
  }) {
    this.studentLendItemRepository = repository.studentLendItemRepository;
    this.studentRepository = repository.studentRepository;
  }

  abstract studentLendItem(payload: IPostLentItemPayload): Promise<void>;
}

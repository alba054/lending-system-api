import { StudentLendItemRepository } from "../../../repository/facade/StudentLendItemRepository/StudentLendItemRepository";
import { LentItemRepository } from "../../../repository/lentItem/LentItemRepository";
import { StudentRepository } from "../../../repository/student/StudentRepository";
import { IPostLentItemPayload } from "../../../utils/interfaces/request/IPostLentItemPayload";

export abstract class StudentLendItemService {
  protected studentLendItemRepository: StudentLendItemRepository;
  protected studentRepository: StudentRepository;
  protected lentItemRepository: LentItemRepository;

  constructor(repository: {
    studentLendItemRepository: StudentLendItemRepository;
    studentRepository: StudentRepository;
    lentItemRepository: LentItemRepository;
  }) {
    this.studentLendItemRepository = repository.studentLendItemRepository;
    this.studentRepository = repository.studentRepository;
    this.lentItemRepository = repository.lentItemRepository;
  }

  abstract updateLentItemStatusById(
    lentItemId: string,
    isReturned: boolean
  ): Promise<void>;

  abstract studentLendItem(payload: IPostLentItemPayload): Promise<void>;
}

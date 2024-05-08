import { LentItemEntity } from "../../../entity/lentItem/LentItemEntity";
import { NotFoundError } from "../../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../../utils";
import { IPostLentItemPayload } from "../../../utils/interfaces/request/IPostLentItemPayload";
import { StudentLendItemService } from "./StudentLendItemService";

export class StudentLendItemServiceImpl extends StudentLendItemService {
  async studentLendItem(payload: IPostLentItemPayload): Promise<void> {
    const student = await this.studentRepository.getStudentByStudentId(
      payload.studentId
    );

    if (!student) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "student's not found"
      );
    }

    const lentItem = new LentItemEntity(
      payload.lendStartTime,
      payload.lendEndTime,
      payload.itemId,
      student.id ?? "",
      {
        description: payload.description,
        roomName: payload.roomName,
      }
    );

    this.studentLendItemRepository.studentLendItem(lentItem);
  }
}

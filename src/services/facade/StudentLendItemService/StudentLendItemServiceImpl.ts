import { LentItemEntity } from "../../../entity/lentItem/LentItemEntity";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { NotFoundError } from "../../../Exceptions/http/NotFoundError";
import { ERRORCODE } from "../../../utils";
import { IPostLentItemPayload } from "../../../utils/interfaces/request/IPostLentItemPayload";
import { StudentLendItemService } from "./StudentLendItemService";

export class StudentLendItemServiceImpl extends StudentLendItemService {
  async updateLentItemStatusById(
    lentItemId: string,
    isReturned: boolean
  ): Promise<void> {
    const lentItem = await this.lentItemRepository.getLentItemById(lentItemId);

    if (!lentItem) {
      throw new NotFoundError(
        ERRORCODE.COMMON_NOT_FOUND,
        "lent item's not found"
      );
    }

    if (isReturned) {
      if (lentItem.returnTime !== 0) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "item has been returned"
        );
      }
    }

    await this.studentLendItemRepository.updateStatusLentItemById(
      lentItemId,
      lentItem.itemId,
      isReturned
    );
  }

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

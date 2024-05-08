import { LentItemEntity } from "../../../entity/lentItem/LentItemEntity";

export abstract class StudentLendItemRepository {
  abstract studentLendItem(lendItem: LentItemEntity): Promise<void>;
}

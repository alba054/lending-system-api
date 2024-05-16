import { LentItemEntity } from "../../../entity/lentItem/LentItemEntity";

export abstract class StudentLendItemRepository {
  abstract updateStatusLentItemById(
    lentItemId: string,
    itemId: string,
    isReturned: boolean
  ): Promise<void>;

  abstract studentLendItem(lendItem: LentItemEntity): Promise<void>;
}

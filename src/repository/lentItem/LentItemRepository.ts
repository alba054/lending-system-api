import { LentItemEntity } from "../../entity/lentItem/LentItemEntity";

export abstract class LentItemRepository {
  abstract getLentItemById(lentItemId: string): Promise<LentItemEntity | null>;

  abstract getLentItemsNoPagination(): Promise<LentItemEntity[]>;

  abstract getLentItems(
    page: number,
    search: string | undefined
  ): Promise<LentItemEntity[]>;
}

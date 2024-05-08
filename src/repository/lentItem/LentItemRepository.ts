import { LentItemEntity } from "../../entity/lentItem/LentItemEntity";

export abstract class LentItemRepository {
  abstract getLentItems(
    page: number,
    search: string | undefined
  ): Promise<LentItemEntity[]>;
}

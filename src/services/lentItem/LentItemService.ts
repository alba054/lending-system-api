import { LentItemEntity } from "../../entity/lentItem/LentItemEntity";
import { LentItemRepository } from "../../repository/lentItem/LentItemRepository";

export abstract class LentItemService {
  protected lentItemRepository: LentItemRepository;

  constructor(repository: { lentItemRepository: LentItemRepository }) {
    this.lentItemRepository = repository.lentItemRepository;
  }

  abstract getLentItems(
    page?: number | undefined,
    search?: string | undefined
  ): Promise<LentItemEntity[]>;
}

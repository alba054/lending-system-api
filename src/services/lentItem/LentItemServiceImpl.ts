import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { LentItemEntity } from "../../entity/lentItem/LentItemEntity";
import { LentItemService } from "./LentItemService";

export class LentItemServiceImpl extends LentItemService {
  async getLentItemsNoPagination(): Promise<LentItemEntity[]> {
    return this.lentItemRepository.getLentItemsNoPagination();
  }

  async getLentItems(
    page: number = 1,
    search?: string | undefined
  ): Promise<LentItemEntity[]> {
    return this.lentItemRepository.getLentItems(page, search);
  }
}

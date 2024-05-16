import { prismaDb } from "../../config/database/PrismaORMDBConfig";
import { ItemEntity } from "../../entity/item/ItemEntity";
import { LentItemEntity } from "../../entity/lentItem/LentItemEntity";
import { StudentEntity } from "../../entity/student/StudentEntity";
import { constants } from "../../utils";
import { LentItemRepository } from "./LentItemRepository";

export class LentItemPrismaRepository extends LentItemRepository {
  async getLentItemById(lentItemId: string): Promise<LentItemEntity | null> {
    const lentItem = await prismaDb.db?.lentItem.findUnique({
      where: { id: lentItemId },
    });

    if (!lentItem) {
      return null;
    }

    return new LentItemEntity(
      Number(lentItem.lendStartTime),
      Number(lentItem.lendEndTime),
      lentItem.itemId,
      lentItem.studentId,
      {
        description: lentItem.desription ?? "",
        id: lentItem.id,
        returnTime: Number(lentItem.returnTime) ?? 0,
        roomName: lentItem.roomName ?? "",
      }
    );
  }

  async getLentItemsNoPagination(): Promise<LentItemEntity[]> {
    const lentItems = await prismaDb.db?.lentItem.findMany({
      include: {
        item: true,
        student: true,
      },
    });

    return (
      lentItems?.map((li) => {
        return new LentItemEntity(
          Number(li.lendStartTime),
          Number(li.lendEndTime),
          li.itemId,
          li.studentId,
          {
            description: li.desription ?? "",
            id: li.id,
            returnTime: Number(li.returnTime),
            roomName: li.roomName ?? "",
            item: new ItemEntity(li.item.name ?? "", {
              description: li.item.description ?? "",
              id: li.item.id,
              stock: li.item.stock,
              thumbnail: li.item.thumbnail ?? "",
              totalItem: li.item.totalItem,
            }),
            student: new StudentEntity(
              li.student.name ?? "",
              li.student.studentId,
              { id: li.student.id }
            ),
          }
        );
      }) ?? []
    );
  }

  async getLentItems(
    page: number,
    search: string | undefined
  ): Promise<LentItemEntity[]> {
    const lentItems = await prismaDb.db?.lentItem.findMany({
      skip: (page - 1) * constants.PAGINATION_OFFSET,
      take: constants.PAGINATION_OFFSET,
      where: {
        OR: [
          { item: { name: { contains: search } } },
          { student: { studentId: { contains: search } } },
        ],
      },
      include: {
        item: true,
        student: true,
      },
    });

    return (
      lentItems?.map((li) => {
        return new LentItemEntity(
          Number(li.lendStartTime),
          Number(li.lendEndTime),
          li.itemId,
          li.studentId,
          {
            description: li.desription ?? "",
            id: li.id,
            returnTime: Number(li.returnTime),
            roomName: li.roomName ?? "",
            item: new ItemEntity(li.item.name ?? "", {
              description: li.item.description ?? "",
              id: li.item.id,
              stock: li.item.stock,
              thumbnail: li.item.thumbnail ?? "",
              totalItem: li.item.totalItem,
            }),
            student: new StudentEntity(
              li.student.name ?? "",
              li.student.studentId,
              { id: li.student.id }
            ),
          }
        );
      }) ?? []
    );
  }
}

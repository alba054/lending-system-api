import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { LentItemEntity } from "../../../entity/lentItem/LentItemEntity";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { InternalServerError } from "../../../Exceptions/http/InternalServerError";
import { ERRORCODE } from "../../../utils";
import { StudentLendItemRepository } from "./StudentLendItemRepository";
import { prismaDb } from "../../../config/database/PrismaORMDBConfig";

export class StudentLendItemPrismaRepositoryImpl extends StudentLendItemRepository {
  async updateStatusLentItemById(
    lentItemId: string,
    itemId: string,
    isReturned: boolean
  ): Promise<void> {
    try {
      await prismaDb.db?.$transaction([
        prismaDb.db.lentItem.update({
          data: {
            returnTime: isReturned
              ? Math.floor(new Date().getTime() / 1000)
              : 0,
          },
          where: { id: lentItemId },
        }),
        prismaDb.db.item.update({
          where: { id: itemId },
          data: {
            stock: {
              increment: isReturned ? 1 : -1,
            },
          },
        }),
      ]);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }

  async studentLendItem(lendItem: LentItemEntity): Promise<void> {
    try {
      await prismaDb.db?.$transaction([
        prismaDb.db.lentItem.create({
          data: {
            lendEndTime: lendItem.lendEndTime,
            lendStartTime: lendItem.lendStartTime,
            desription: lendItem.description,
            itemId: lendItem.itemId,
            returnTime: lendItem.returnTime,
            roomName: lendItem.roomName,
            studentId: lendItem.studentId,
          },
        }),
        prismaDb.db.item.update({
          where: { id: lendItem.itemId },
          data: {
            stock: {
              decrement: 1,
            },
          },
        }),
      ]);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }
    }
  }
}

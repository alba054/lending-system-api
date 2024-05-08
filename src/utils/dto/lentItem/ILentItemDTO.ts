import { LentItemEntity } from "../../../entity/lentItem/LentItemEntity";

interface ILentItemDTO {
  status: "RETURNED" | "LENT";
  lendStartTime: number;
  lendEndTime: number;
  roomName: string;
  description: string;
  returnTime: number;
  item: {
    id: string;
    name: string;
    itemThumbnail: string;
  };
  student: {
    name: string;
    studentId: string;
    id: string;
  };
}

export const LentItemDTO = (lentItem: LentItemEntity) => {
  return {
    description: lentItem.description,
    lendEndTime: lentItem.lendEndTime,
    lendStartTime: lentItem.lendStartTime,
    roomName: lentItem.roomName,
    status: lentItem.returnTime !== 0 ? "RETURNED" : "LENT",
    returnTime: lentItem.returnTime,
    item: {
      id: lentItem.item?.id,
      itemThumbnail: lentItem.item?.thumbnail,
      name: lentItem.item?.name,
    },
    student: {
      id: lentItem.student?.id,
      name: lentItem.student?.name,
      studentId: lentItem.student?.studentId,
    },
  } as ILentItemDTO;
};

import { ItemEntity } from "../../../entity/item/ItemEntity";

interface IItemDTO {
  name: string;
  stock: number;
  thumbnail: string;
  description: string;
  totalItem: number;
  itemId: string;
}

export const ItemDTO = (item: ItemEntity) => {
  return {
    name: item.name,
    description: item.description,
    stock: item.stock,
    thumbnail: item.thumbnail,
    totalItem: item.totalItem,
    itemId: item.id,
  } as IItemDTO;
};

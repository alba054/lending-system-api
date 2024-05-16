import { ItemEntity } from "../../entity/item/ItemEntity";
import { NotFoundError } from "../../Exceptions/http/NotFoundError";
import { ItemRepository } from "../../repository/item/ItemRepository";
import { ERRORCODE } from "../../utils";
import { IPostItemPayload } from "../../utils/interfaces/request/IPostItemPayload";
import { IPutItemPayload } from "../../utils/interfaces/request/IPutItemPayload";
import { ItemService } from "./ItemService";

export class ItemServiceImpl extends ItemService {
  constructor(repository: { itemRepository: ItemRepository }) {
    super(repository);
  }

  async getItemsNoPagination(): Promise<ItemEntity[]> {
    return this.itemRepository.getItemsNoPagination();
  }

  async getItemById(itemId: string): Promise<ItemEntity> {
    const item = await this.itemRepository.getItemById(itemId);

    if (!item) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "item's not found");
    }

    return item;
  }

  async updateItemById(
    itemId: string,
    payload: IPutItemPayload
  ): Promise<void> {
    const item = await this.itemRepository.getItemById(itemId);

    if (!item) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "item's not found");
    }

    this.itemRepository.updateItemById(itemId, payload);
  }

  async deleteItemById(itemId: string): Promise<void> {
    const item = await this.itemRepository.getItemById(itemId);

    if (!item) {
      throw new NotFoundError(ERRORCODE.COMMON_NOT_FOUND, "item's not found");
    }

    this.itemRepository.deleteItemById(itemId);
  }

  async getItems(
    page: number = 1,
    search?: string | undefined
  ): Promise<ItemEntity[]> {
    return this.itemRepository.getItems(page, search);
  }

  async addNewItem(payload: IPostItemPayload): Promise<void> {
    const newItem = new ItemEntity(payload.name, {
      description: payload.description,
      stock: payload.stock,
      thumbnail: payload.thumbnail,
      totalItem: payload.stock,
    });

    await this.itemRepository.addNewItem(newItem);
  }
}

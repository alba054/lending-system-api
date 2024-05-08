import { Request, Response, NextFunction } from "express";
import { RESPONSE_MESSAGE, createResponse } from "../../../utils";
import { ItemHandler } from "./ItemHandler";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ItemService } from "../../../services/item/ItemService";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { IPostItemPayload } from "../../../utils/interfaces/request/IPostItemPayload";
import { ItemPostPayloadSchema } from "../../../utils/validator/item/Joi/ItemPostPayloadSchema";
import { ItemDTO } from "../../../utils/dto/item/IItemDTO";
import { IPutItemPayload } from "../../../utils/interfaces/request/IPutItemPayload";
import { ItemPutPayloadSchema } from "../../../utils/validator/item/Joi/ItemPutPayloadSchema";
import { IPostLentItemPayload } from "../../../utils/interfaces/request/IPostLentItemPayload";
import { LentItemPostPayloadSchema } from "../../../utils/validator/item/Joi/LentItemPostPayloadSchema";
import { StudentLendItemService } from "../../../services/facade/StudentLendItemService/StudentLendItemService";
import { LentItemService } from "../../../services/lentItem/LentItemService";
import { LentItemDTO } from "../../../utils/dto/lentItem/ILentItemDTO";

export class ItemHandlerImpl extends ItemHandler {
  private itemService: ItemService;
  private studentLendItemService: StudentLendItemService;
  private schemaValidator: SchemaValidator;
  private lentItemService: LentItemService;

  constructor(
    service: {
      itemService: ItemService;
      studentLendItemService: StudentLendItemService;
      lentItemService: LentItemService;
    },
    validator: { schemaValidator: SchemaValidator }
  ) {
    super();
    this.itemService = service.itemService;
    this.studentLendItemService = service.studentLendItemService;
    this.lentItemService = service.lentItemService;
    this.schemaValidator = validator.schemaValidator;
  }

  async getLentItems(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { page, s } = req.query;

    const lentItems = await this.lentItemService.getLentItems(
      parseInt(String(page ?? "1")),
      String(s ?? "")
    );

    return res
      .status(200)
      .json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, lentItems.map(LentItemDTO))
      );
  }

  async postLentItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const payload: IPostLentItemPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: LentItemPostPayloadSchema,
        payload,
      });

      await this.studentLendItemService.studentLendItem(payload);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully update an item"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { itemId } = req.params;

    try {
      const item = await this.itemService.getItemById(itemId);

      return res
        .status(200)
        .json(createResponse(RESPONSE_MESSAGE.SUCCESS, ItemDTO(item)));
    } catch (error) {
      return next(error);
    }
  }

  async putItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { itemId } = req.params;
    const payload: IPutItemPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: ItemPutPayloadSchema,
        payload,
      });

      await this.itemService.updateItemById(itemId, payload);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully update an item"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async deleteItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { itemId } = req.params;

    try {
      await this.itemService.deleteItemById(itemId);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully delete an item"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async getItems(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const { page, s } = req.query;

    const items = await this.itemService.getItems(
      parseInt(String(page ?? "1")),
      String(s ?? "")
    );

    return res
      .status(200)
      .json(createResponse(RESPONSE_MESSAGE.SUCCESS, items.map(ItemDTO)));
  }

  async postItem(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    const payload: IPostItemPayload = req.body;

    try {
      this.schemaValidator.validate({
        schema: ItemPostPayloadSchema,
        payload,
      });

      await this.itemService.addNewItem(payload);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add a new item"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

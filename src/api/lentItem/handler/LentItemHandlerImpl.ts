import { LentItemHandler } from "./LentItemHandler";
import { ItemService } from "../../../services/item/ItemService";
import { SchemaValidator } from "../../../utils/validator/SchemaValidator";
import { StudentLendItemService } from "../../../services/facade/StudentLendItemService/StudentLendItemService";
import { LentItemService } from "../../../services/lentItem/LentItemService";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BadRequestError } from "../../../Exceptions/http/BadRequestError";
import { createResponse, ERRORCODE, RESPONSE_MESSAGE } from "../../../utils";

export class LentItemHandlerImpl extends LentItemHandler {
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

  async putLentItemStatus(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) {
    const { lentItemId } = req.params;

    try {
      const { isReturned } = req.body;

      if (typeof isReturned === "undefined") {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "provide isReturned"
        );
      }

      if (!Boolean(isReturned)) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "provide true to return"
        );
      }

      await this.studentLendItemService.updateLentItemStatusById(
        lentItemId,
        Boolean(isReturned)
      );

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully (un)return item"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}

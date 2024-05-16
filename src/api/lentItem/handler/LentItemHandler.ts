import { NextFunction, Request, Response } from "express";

export abstract class LentItemHandler {
  constructor() {
    this.putLentItemStatus = this.putLentItemStatus.bind(this);
  }

  abstract putLentItemStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any>;
}

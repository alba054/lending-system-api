import { Router } from "express";
import { BaseRouter } from "../../base/Router";
import { LentItemHandler } from "../handler/LentItemHandler";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";

export class LentItemRouterImpl extends BaseRouter {
  private handler: LentItemHandler;
  private authorizationMiddleware: AuthorizationBearer;

  constructor(
    handler: LentItemHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/lent-items");
    this.handler = handler;
    this.authorizationMiddleware = authorizationMiddleware;
  }

  register(): Router {
    this.router
      .route(this.path + "/:lentItemId")
      .put(
        this.authorizationMiddleware.authorize(),
        this.handler.putLentItemStatus
      );

    return this.router;
  }
}

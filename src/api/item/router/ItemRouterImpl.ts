import { Router } from "express";
import { BaseRouter } from "../../base/Router";
import { ItemHandler } from "../handler/ItemHandler";
import { AuthorizationBearer } from "../../../middleware/auth/AuthorizationBearer";

export class ItemRouterImpl extends BaseRouter {
  private handler: ItemHandler;
  private authorizationMiddleware: AuthorizationBearer;

  constructor(
    handler: ItemHandler,
    authorizationMiddleware: AuthorizationBearer
  ) {
    super("/items");
    this.handler = handler;
    this.authorizationMiddleware = authorizationMiddleware;
  }

  register(): Router {
    // * create item
    // * get items
    this.router
      .route(this.path)
      .post(this.authorizationMiddleware.authorize(), this.handler.postItem)
      .get(this.handler.getItems);

    // * student lend item
    this.router
      .route(this.path + "/lent-items")
      .post(this.authorizationMiddleware.authorize(), this.handler.postLentItem)
      .get(this.authorizationMiddleware.authorize(), this.handler.getLentItems);

    // * delete item
    // * update item
    // * get item detail
    this.router
      .route(this.path + "/:itemId")
      .delete(this.authorizationMiddleware.authorize(), this.handler.deleteItem)
      .put(this.authorizationMiddleware.authorize(), this.handler.putItem)
      .get(this.handler.getItem);

    return this.router;
  }
}

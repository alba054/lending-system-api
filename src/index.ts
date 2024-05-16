import { ItemHandlerImpl } from "./api/item/handler/ItemHandlerImpl";
import { ItemRouterImpl } from "./api/item/router/ItemRouterImpl";
import { LentItemHandlerImpl } from "./api/lentItem/handler/LentItemHandlerImpl";
import { LentItemRouterImpl } from "./api/lentItem/router/LentItemRouterImpl";
import { UserHandlerImpl } from "./api/user/handler/UserHandlerImpl";
import { UserRouterImpl } from "./api/user/router/UserRouterImpl";
import { hashImpl } from "./config/crypto";
import connectDatabase from "./config/database";
import { startServer } from "./config/express";
import { AuthorizationBearer } from "./middleware/auth/AuthorizationBearer";
import { BasicAuthMiddleware } from "./middleware/auth/BasicAuth";
import { StudentLendItemPrismaRepositoryImpl } from "./repository/facade/StudentLendItemRepository/StudentLendItemPrismaRepositoryImpl";
import { ItemPrismaRepositoryImpl } from "./repository/item/ItemPrismaRepositoryImpl";
import { LentItemPrismaRepository } from "./repository/lentItem/LentItemPrismaRepository";
import { StudentPrismaRepositoryImpl } from "./repository/student/StudentPrismaRepositoryImpl";
import { UserPrismaRepositoryImpl } from "./repository/user/UserPrismaRepositoryImpl";
import { AuthServiceImpl } from "./services/auth/AuthServiceImpl";
import { StudentLendItemServiceImpl } from "./services/facade/StudentLendItemService/StudentLendItemServiceImpl";
import { ItemServiceImpl } from "./services/item/ItemServiceImpl";
import { LentItemServiceImpl } from "./services/lentItem/LentItemServiceImpl";
import { UserServiceImpl } from "./services/user/UserServiceImpl";
import { JoiValidatorImpl } from "./utils/validator/JoiValidatorImpl";

// * repositories
const userRepository = new UserPrismaRepositoryImpl();
const itemRepository = new ItemPrismaRepositoryImpl();
const studentLendItemRepository = new StudentLendItemPrismaRepositoryImpl();
const studentRepository = new StudentPrismaRepositoryImpl();
const lentItemRepository = new LentItemPrismaRepository();
// * services
const userService = new UserServiceImpl({ userRepository }, hashImpl);
const itemService = new ItemServiceImpl({ itemRepository });
const authService = new AuthServiceImpl();
const studentLendItemService = new StudentLendItemServiceImpl({
  studentLendItemRepository,
  studentRepository,
  lentItemRepository,
});
const lentItemService = new LentItemServiceImpl({ lentItemRepository });
// * validators
const schemaValidator = new JoiValidatorImpl();
// * handlers
const userHandler = new UserHandlerImpl(
  { authService, userService },
  schemaValidator
);
const itemHandler = new ItemHandlerImpl(
  { itemService, studentLendItemService, lentItemService },
  { schemaValidator }
);
const lentItemHandler = new LentItemHandlerImpl(
  { itemService, studentLendItemService, lentItemService },
  { schemaValidator }
);
// * misc
const basicAuthMiddleware = new BasicAuthMiddleware(userService, hashImpl);
const authorizationMiddleware = new AuthorizationBearer(userService);
// * routers
const userRouter = new UserRouterImpl(
  userHandler,
  basicAuthMiddleware,
  authorizationMiddleware
);
const itemRouter = new ItemRouterImpl(itemHandler, authorizationMiddleware);
const lentItemRouter = new LentItemRouterImpl(
  lentItemHandler,
  authorizationMiddleware
);

connectDatabase();

startServer([userRouter, itemRouter, lentItemRouter]).start();

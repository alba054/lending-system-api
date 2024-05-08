import { UserEntity } from "../../../entity/user/UserEntity";

interface IUserCredentialDTO {
  username: string;
  userId: string;
}

export const userCredentialDTO = (user: UserEntity) => {
  return {
    userId: user.id,
    username: user.name,
  } as IUserCredentialDTO;
};

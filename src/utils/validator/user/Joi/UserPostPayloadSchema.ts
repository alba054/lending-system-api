import Joi from "joi";

export const UserPostPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

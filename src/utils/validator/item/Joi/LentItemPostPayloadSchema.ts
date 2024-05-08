import Joi from "joi";

export const LentItemPostPayloadSchema = Joi.object({
  lendStartTime: Joi.number().required().min(0),
  lendEndTime: Joi.number().required().min(0),
  description: Joi.string().optional(),
  roomName: Joi.string().optional(),
  itemId: Joi.string().required(),
  studentId: Joi.string().required(),
});

import * as Joi from "joi";

export const idValidation = Joi.object().keys({
  id: Joi.number().required().empty(),
});

import * as Joi from "joi";

export const registrationValidation = Joi.object().keys({
  email: Joi.string().required().empty().email(),
  password: Joi.string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password"
    )
    .required()
    .min(6)
    .empty(),
  first_name: Joi.string().required().empty(),
  last_name: Joi.string().required().empty(),
  dob: Joi.string().required().empty(),
  role: Joi.string().valid("Admin", "User").required().empty(),
});

export const loginValidation = Joi.object().keys({
  email: Joi.string().required().empty().email(),
  password: Joi.string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password"
    )
    .required()
    .min(6)
    .empty(),
});

export const activeValidation = Joi.object().keys({
  email: Joi.string().required().empty().email(),
  status: Joi.boolean().required().empty(),
});

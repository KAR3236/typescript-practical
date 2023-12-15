import * as Joi from "joi";

export const addBlogValidation = Joi.object().keys({
  title: Joi.string().required().empty(),
  description: Joi.string().required().empty(),
  publised_date: Joi.date().required().empty(),
  modify_date: Joi.date().required().empty(),
  status: Joi.string().valid("Publish", "Unpublish").required().empty(),
  category: Joi.number().required().empty(),
  author: Joi.string().required().empty(),
});

export const editBlogValidation = Joi.object().keys({
  title: Joi.string().required().empty().optional(),
  description: Joi.string().required().empty().optional(),
  publised_date: Joi.date().required().empty().optional(),
  modify_date: Joi.date().required().empty().optional(),
  status: Joi.string()
    .valid("Publish", "Unpublish")
    .required()
    .empty()
    .optional(),
  category: Joi.number().required().empty().optional(),
  author: Joi.string().required().empty().optional(),
});

export const idBlogValidation = Joi.object().keys({
  id: Joi.number().required().empty(),
});

const queryDataSchema = Joi.object({
  page: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(0).optional(),
});

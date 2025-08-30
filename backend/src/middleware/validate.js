const { StatusCodes } = require("http-status-codes");
const { z } = require("zod");

function validate(schema) {
  return (req, res, next) => {
    if (!req.body) req.body = {};
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorList = result.error.errors || result.error.issues || [];
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: errorList.map((e) => e.message),
      });
    }
    req.body = result.data;
    next();
  };
}
module.exports = validate;

const { validationResult } = require('express-validator')

const validateRequest = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)))

  const errors = validationResult(req)

  if (errors.isEmpty()) return next()

  return res
    .status(422)
    .json({ validation: true, errors: errors.array({ onlyFirstError: true }) })
}

module.exports = { validateRequest }

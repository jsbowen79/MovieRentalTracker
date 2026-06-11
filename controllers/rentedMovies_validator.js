const { body, param, validationResult } = require('express-validator'); 
const { ObjectId } = require('mongodb');
const UserDataError = require('../errors/UserDataError');
const validRentalRules = () => {
    return [
        param('userId')
            .notEmpty()
            .withMessage("Please Provide a user Id.")
            .custom(value => ObjectId.isValid(value))
            .withMessage('The userId is invalid.')
            .bail(),
      
        body('movieId')
            .notEmpty()
            .withMessage("Please Provide a Movie Id.")
            .custom(value => ObjectId.isValid(value))
            .withMessage('The userId is invalid.')
            .trim()
            .bail(),
        
      
      
        
        body('dateReturned')
            .optional()
            .custom(value => {
                const dateRegex =
                    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

                if (!dateRegex.test(value)) {
                    throw new UserDataError(
                        'Date must be in mm/dd/yyyy format.'
                    )
                }
                const [month, day, year] = value.split("/");
                const date = new Date(
                  Number(year),
                  Number(month) - 1,
                  Number(day),
                );

                if (
                    date.getFullYear() !== Number(year) ||
                    date.getMonth() + 1 !== Number(month) ||
                    date.getDate() !== Number(day)) {
                    throw new UserDataError('Please enter a valid date.');
                }
                
                return true;
            })
    ];
}


const validateNew = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next();
    }; 
    const extractedErrors = []; 
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg })); 
    return new UserDataError(
        {errors: extractedErrors})
}

const updateTransactionRules = () => {
    return [
        params("transId")
        .notEmpty()
        .withMessage("A transaction id is required to update a transaction.")
        .trim()
        .escape()
        .bail(),
        
        body("userId")
        .optional()
        .custom(value => ObjectId.isValid(value))
        .withMessage('The userId is invalid.')
        .trim()
        .bail(),
        
        body("movieId")
        .optional()
        .custom(value => ObjectId.isValid(value))
        .withMessage('The movieId is invalid.')
        .trim()
        .bail(),
        
        body("out")
        .optional()
        .custom(value => {
         if(value == 'true' || value == 'false')
            {
                return true;
            } else {
                return false; 
        }
        })
        .withMessage('Out must be "true" or "false".')
        .trim()
        .escape()
        .bail(),
        
        body('dateReturned')
            .optional()
            .custom(value => {
                const dateRegex =
                    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

                if (!dateRegex.test(value)) {
                    throw new UserDataError(
                        'Date must be in mm/dd/yyyy format.'
                    )
                }
                const [month, day, year] = value.split("/");
                const date = new Date(
                  Number(year),
                  Number(month) - 1,
                  Number(day),
                );

                if (
                    date.getFullYear() !== Number(year) ||
                    date.getMonth() + 1 !== Number(month) ||
                    date.getDate() !== Number(day)) {
                    throw new UserDataError('Please enter a valid date.');
                }
                
                return true;
            })
    ];
};

const validateUpdate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { validateNew, validateUpdate, validRentalRules, updateTransactionRules }
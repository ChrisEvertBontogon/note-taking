import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

export const createRules = [
  body('title').notEmpty().withMessage('Title cannot be Empty')
  .isLength({ max: 50 }).withMessage('Title should not exceed 50 characters'),
  body('body').isLength({ max: 500 }).withMessage('Body should not exceed 500 characters')
];

export const queryRules = [
  param('id').exists().matches(/^[0-9]+$/).withMessage('Id must be a number')
]

export const updateRules = [
  param('id').exists().matches(/^[0-9]+$/).withMessage('Id must be a number'),
  body('title').optional().notEmpty().withMessage('Title cannot be Empty')
  .isLength({ max: 50 }).withMessage('Title should not exceed 50 characters'),
  body('body').optional().isLength({ max: 500 }).withMessage('Body should not exceed 500 characters')
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({ errors: errors.array() });
}
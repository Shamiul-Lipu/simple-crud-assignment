import Joi from "joi";

const OrdersValidatorSchema = Joi.object({
  productName: Joi.string().trim().required().messages({
    "string.empty": "Product name cannot be empty",
    "any.required": "Product name is required",
  }),
  price: Joi.number().min(0).required().messages({
    "number.min": "Price must be a positive number or zero",
    "any.required": "Price is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

const userValidatorSchema = Joi.object({
  userId: Joi.number().integer().min(1).required().messages({
    "number.integer": "User ID must be an integer",
    "number.min": "User ID must be at least 1",
    "any.required": "User ID is required",
  }),
  username: Joi.string()
    .trim()
    .max(30)
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required()
    .messages({
      "string.empty": "Username cannot be empty",
      "string.max": "Username cannot exceed 30 characters",
      "any.required": "Username is required",
      "string.pattern.base": "Username must contain only letters",
    }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
  }),
  fullName: Joi.object({
    firstName: Joi.string()
      .trim()
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        "any.required": "First Name is required",
        "string.empty": "First Name cannot be empty",
        "string.pattern.base":
          "First Name must contain only alphabetic characters",
      }),
    lastName: Joi.string()
      .trim()
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        "any.required": "Last Name is required",
        "string.empty": "Last Name cannot be empty",
        "string.pattern.base":
          "Last Name must contain only alphabetic characters",
      }),
  }),
  age: Joi.number().integer().max(120).required().messages({
    "number.integer": "Age must be an integer",
    "number.max": "Age cannot exceed 120",
    "any.required": "Age is required",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  isActive: Joi.boolean().required().messages({
    "any.required": "Active status is required",
  }),
  hobbies: Joi.array().items(Joi.string()).required().messages({
    "any.required": "Hobbies are required",
    "array.base": "Hobbies must be an array of strings",
  }),
  address: Joi.object({
    street: Joi.string().required().messages({
      "any.required": "Street is required",
      "string.empty": "Street cannot be empty",
    }),
    city: Joi.string().required().messages({
      "any.required": "City is required",
      "string.empty": "City cannot be empty",
    }),
    country: Joi.string().required().messages({
      "any.required": "Country is required",
      "string.empty": "Country cannot be empty",
    }),
  }),
  orders: Joi.array().items(OrdersValidatorSchema),
});

export { userValidatorSchema, OrdersValidatorSchema };

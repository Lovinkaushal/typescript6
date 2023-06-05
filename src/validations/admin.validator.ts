import joi from 'joi';

const schema = joi.object({
    email: joi.string().trim().email().min(4).max(35).required(),
    password: joi.string().min(4).max(100).required(),
})
const sellerSchema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    phoneNumber: joi.string().min(8).required(),
    address: joi.string().min(8).required(),
    isBlocked: joi.string().min(2).required(),
  });

  export const userSchema = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().trim().email().min(4).max(35).required(),
    password: joi.string().min(8).required(),
    phoneNumber: joi.string().min(8).required(),
    address: joi.string().min(8).required(),
    isBlocked: joi.string().min(2).required(),
  });
  const productSchema = joi.object({
    name: joi.string().min(3).required(),
    type: joi.string().min(3).required(),
    price: joi.string().min(2).required(),
    _for: joi.string().min(3).required(),
    size: joi.string().min(2).required(),
    isAvailable: joi.string().min(2).required(),
    offer: joi.string().min(2),
    owner:joi.string().min(3).required()
  })
  export const cartSchema = joi.object({
    user_id: joi.string().min(8).required(),
    product_id: joi.string().min(8).required(),
    quantity: joi.string().min(1).required()
  });
    const fillProductSchema = joi.object({
    userId: joi.string().min(3).required(),
    username: joi.string().min(3).required(),
    email: joi.string().min(3).required(),
    password: joi.string().min(2).required(),
    phoneNumber: joi.string().min(3).required(),
    address: joi.string().min(2).required(),
    isBlocked: joi.string().min(2).required()
  })

const adminProfileSchema = joi.object({
    firstName: joi.string().trim().min(4).max(20).required(),
    lastName: joi.string().min(4).max(20).required(),
    email: joi.string().trim().email().min(4).max(35).required(),
    password: joi.string().min(4).max(20).required(),
})
export const offerSchema = joi.object({
    productId: joi.string().min(3).required(),
    discount: joi.string().min(3).required(),
    afterDiscount: joi.string().min(3).required(),
    startDate: joi.string().min(3).required(),
    endDate: joi.string().min(3).required(),
  })
const forgotPasswordSchema = joi.object({
    email: joi.string().trim().email().min(4).max(35).required()
})

const validateResetPasswordSchema = joi.object({
    password: joi.string().min(4).max(20).required(),
})
const validateChangePasswordSchema = joi.object({
    oldPassword: joi.string().min(4).max(20).required(),
    newPassword: joi.string().min(4).max(20).required(),
})

export const validateAnyLogin = (admin: any) => {
    return schema.validate(admin)
}
export const validateOffer = (admin: any) => {
    return offerSchema.validate(admin)
}
export const validateFillProduct = (admin: any) => {
    return fillProductSchema.validate(admin)
}
export const validateProfile = (admin: any) => {
    return sellerSchema.validate(admin)
}
export const validateUser = (admin: any) => {
    return userSchema.validate(admin)
}
export const validateProduct = (admin: any) => {
    return productSchema.validate(admin)
}

export const validateForgotPassword = (admin: any) => {
    return forgotPasswordSchema.validate(admin)
}

export const validateResetPassword = (admin: any) => {
    return validateResetPasswordSchema.validate(admin)
}
export const validateCart = (admin: any) => {
    return cartSchema.validate(admin)
}
export const validateChangePassword = (admin: any) => {
    return validateChangePasswordSchema.validate(admin)
}
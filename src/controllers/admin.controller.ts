import { Route, Controller, Tags, Post, Body, Get, Security, Query, FormField, UploadedFile } from 'tsoa'
import { IResponse } from '../utils/interface.utils';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express'
import { findOne, upsert } from '../helpers/db.helpers';
import {  signToken, genHash } from '../utils/common.util';
import {  validateProfile, validateUser, validateAnyLogin, validateProduct, validateCart, validateFillProduct, validateOffer } from '../validations/admin.validator';
import { adminModel } from '../model/admin.model';
import { productModel } from '../model/product.model';
import { sellerModel } from '../model/seller.model';
import { userModel } from '../model/user.model'
import multer from 'multer';
import { cartModel } from '../model/cart.model';
import { fillProductModel } from '../model/fillProduct.model';
import mongoose from 'mongoose';
import { offerModel } from '../model/offer.model';
import { Transaction } from '../model/transaction.model';
export const bootstrapAdmin = async () => {
    let admin = await adminModel.findOne({ role: "ADMIN" });
    if (!admin) {
        let adminPass = bcrypt.hashSync("admin_pass", 10);
        await adminModel.create({
            username: "admin",
            email: "admin@yopmail.com",
            password: adminPass,
            role: "ADMIN",
        })
    }
}
bootstrapAdmin();

@Tags('Admin')
@Route('api/admin')
export default class AdminController extends Controller {
    // @ts-ignore
    constructor(req: Request, res: Response) {
        super();
    }
    /**
     * Get user login
     */
    @Post("/login")
    public async login(@Body() request: { email: string, password: string }): Promise<IResponse> {
        try {
            const { email, password } = request;
            console.log(email)
            const validatedUser = validateAnyLogin({ email, password });
            if (validatedUser.error) {
                throw new Error(validatedUser.error.message)
            }
            console.log(validatedUser)
            const exists = await findOne(adminModel, { email });
            if (!exists) {
                throw new Error('Admin doesn\'t exists!');
            }
            console.log(exists)
            // check if blocked
            // if (exists.isBlocked) {
            //     throw new Error('Admin is not approved yet!');
            // }
            console.log(password, exists.password)
            const isValid = await bcrypt.compare(password, exists.password);
            console.log(isValid)
            if (!isValid) {
                throw new Error('Password seems to be incorrect');
            }
            const token = await signToken(exists._id)
            delete exists.password
            return {
                data: { ...exists, token },
                error: '',
                message: 'Login Success',
                status: 200
            }
        }
        catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }

    /**
 * signin seller
 */
    @Post("/sellerRegistration")
    public async sellerRegistration(@Body() request: { username: string, email: string, password: string, phoneNumber: string, address: string, isBlocked: string }): Promise<IResponse> {
        try {
            const { username, email, password, phoneNumber, address, isBlocked } = request;
            const validatedProfile = validateProfile({ username, email, password, phoneNumber, address, isBlocked });
            if (validatedProfile.error) {
                throw new Error(validatedProfile.error.message)
            }
            const newPassword = await bcrypt.hash(password, 10);
            console.log(newPassword);
            const hashed = await genHash(password);
            const saveResponse = await upsert(sellerModel, { username, email, password, phoneNumber, address, isBlocked })
            console.log(saveResponse)
            const token = await signToken(saveResponse._id, { purpose: 'temp' }, '1hr')
            return {
                data: { ...saveResponse.toObject(), token },
                error: '',
                message: 'User registered successfully',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    /**
     * Get seller login
     */
    @Post("/sellerLogin")
    public async sellerLogin(@Body() request: { email: string, password: string }): Promise<IResponse> {
        try {
            const { email, password } = request;
            const validatedUser = validateAnyLogin({ email, password });
            if (validatedUser.error) {
                throw new Error(validatedUser.error.message)
            }
            console.log(validatedUser)
            const exists = await findOne(sellerModel, { email });
            if (!exists) {
                throw new Error('Admin doesn\'t exists!');
            }
            // check if blocked
            // if (exists.isBlocked) {
            //     throw new Error('Admin is not approved yet!');
            // }
            console.log(password, exists.password)
            const isValid = await password === exists.password;
            if (!isValid) {
                throw new Error('Password seems to be incorrect');
            }
            const token = await signToken(exists._id)
            delete exists.password
            return {
                data: { ...exists, token },
                error: '',
                message: 'Login Success',
                status: 200
            }
        }
        catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }

    /**
    * signin user
    */
    @Post("/userRegistration")
    public async userRegistration(@Body() request: { username: string, email: string, password: string, phoneNumber: string, address: string, isBlocked: string }): Promise<IResponse> {
        try {
            const { username, email, password, phoneNumber, address, isBlocked } = request;
            const validatedProfile = validateUser({ username, email, password, phoneNumber, address, isBlocked });
            if (validatedProfile.error) {
                throw new Error(validatedProfile.error.message)
            }
            const newPassword = await bcrypt.hash(password, 10);
            console.log(newPassword);
            const hashed = await genHash(password);
            const saveResponse = await upsert(userModel, { username, email, password, phoneNumber, address, isBlocked })
            console.log(saveResponse)
            const token = await signToken(saveResponse._id, { purpose: 'temp' }, '1hr')
            return {
                data: { ...saveResponse.toObject(), token },
                error: '',
                message: 'User registered successfully',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    /**
   * Get user login
   */
    @Post("/userLogin")
    public async userLogin(@Body() request: { email: string, password: string }): Promise<IResponse> {
        try {
            const { email, password } = request;
            const validatedUser = validateAnyLogin({ email, password });
            if (validatedUser.error) {
                throw new Error(validatedUser.error.message)
            }
            console.log(validatedUser)
            const exists = await findOne(userModel, { email });
            if (!exists) {
                throw new Error('Admin doesn\'t exists!');
            }
            // check if blocked
            // if (exists.isBlocked) {
            //     throw new Error('Admin is not approved yet!');
            // }
            console.log(password, exists.password)
            const isValid = await password === exists.password;
            if (!isValid) {
                throw new Error('Password seems to be incorrect');
            }
            const token = await signToken(exists._id)
            delete exists.password
            return {
                data: { ...exists, token },
                error: '',
                message: 'Login Success',
                status: 200
            }
        }
        catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    /**
   * Get product
   */
    @Post("/product")
    public async product(@FormField() name?: string, @FormField() size?: string, @FormField() type?: string, @FormField() price?: string, @FormField() _for?: string, @FormField() isAvailable?: string, @FormField() offer?: string, @FormField() owner?: string, @UploadedFile('product_image') file?: Express.Multer.File): Promise<IResponse> {
        try {
            const { error, value } = validateProduct({ name, type, price, _for, size, isAvailable, offer, owner });
            if (!value) {
                throw new Error(value.error.message)
            }
            const newProduct = await productModel.create({ ...value });
            if (!newProduct) {
                throw new Error('Failed to create product');
            }
            //const token = await signToken({ productId: newProduct._id.toString()}, 'secretKey', { expiresIn: '1h' });
            return {
                data: newProduct,
                error: '',
                message: 'Product Save Sucessfully',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    /**
       * Get update
       */
    @Post("/update")
    public async update(@FormField() _id?: string, @FormField() name?: string, @FormField() type?: string, @FormField() price?: string, @FormField() _for?: string, @FormField() size?: string, @FormField() isAvailable?: string, @FormField() offer?: string, @FormField() owner?: string, @UploadedFile('product_image') file?: Express.Multer.File): Promise<IResponse> {
        try {

            const { error, value } = await validateProduct({ _id, name, size, owner, type, price, _for, offer, isAvailable });
            if (_id && typeof value == "object") {
                delete value._id;
                const updatedProduct = await productModel.findByIdAndUpdate({ _id }, { $set: { ...value, ...(file ? { Image: file.filename } : null) } }, { new: true });
                return {
                    data: { ...updatedProduct?.toObject() },
                    error: '',
                    message: 'Updated Sucessfully',
                    status: 200
                }
            } else {
                throw new Error('_id not found!')
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    /**
       * All product Search
       */
    @Get("/productSearch")
    public async productSearch(@Query() pageNo?: string, @Query() pageSize?: string): Promise<IResponse> {
        try {
            const product = await productModel.find().skip((Number(pageNo) - 1) * Number(pageSize)).limit(Number(pageSize));
            return {
                data: product,
                error: '',
                message: 'Search Done Sucessfully',
                status: 200
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error occurred',
                message: 'Failed to Search',
                status: 404
            };
        }
    }
    /**
       * Search Product by Name
       */
    @Get("/Search")
    public async Search(@Query() name?: string, @Query() type?: string): Promise<IResponse> {
        try {
            console.log(name, type)
            const results = await productModel.aggregate([
                {
                    $match: {
                        $or: [
                            { name: { $regex: `${name}`, $options: 'i' } },
                            { type: { $regex: `${type}`, $options: 'i' } },
                        ],
                    }
                },
                {
                    $lookup: {
                        from: 'offerdetails', // The name of the offerModel collection
                        localField: '_id',
                        foreignField: 'productId',
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    productId: 0
                                }
                            }
                        ],
                        as: 'offerDetails',
                    },
                },
            ]);
            return {
                data: results,
                error: '',
                message: 'Search Done Sucessfully',
                status: 200
            }

        } catch (error) {
            return {
                data: null,
                error: 'Error occurred',
                message: 'Failed to Search',
                status: 404
            };
        }

    }
    /**
       * Delete Product
       */
    @Get("/Delete_Product")
    public async Delete_Product(@Query() _id?: string,): Promise<IResponse> {
        try {
            const deleteUser = await productModel.findOneAndDelete({ _id });
            return {
                data: deleteUser,
                error: '',
                message: 'Product Delete Sucessfully',
                status: 200
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error occurred',
                message: 'Failed to Search',
                status: 404
            };
        }

    }
    /**
       * Admin Search
       */
    @Get("/admin_Search")
    public async admin_Search(@Query() _id?: string,): Promise<IResponse> {
        try {
            const search = await adminModel.find();
            return {
                data: search,
                error: '',
                message: 'Admin Search Sucessfully',
                status: 200
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error occurred',
                message: 'Failed to Search',
                status: 404
            };
        }

    }
    @Post("/add_to_cart")
    public async add_to_cart(@Body() request: { user_id: string, product_id: string, quantity: string }): Promise<IResponse> {
        try {
            const { user_id, product_id, quantity } = request;
            const validatedCart = validateCart({ user_id, product_id, quantity });
            if (validatedCart.error) {
                throw new Error(validatedCart.error.message)
            }
            const newProduct = await cartModel.create({ ...validatedCart.value });
            if (!newProduct) {
                throw new Error('Failed to Create Cart');
            }
            const token = await signToken(newProduct._id.toString(), { purpose: 'temp' }, '1hr')
            return {
                data: newProduct,
                error: '',
                message: 'Product Save Sucessfully',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    /**
       * User Cart Search
       */
    @Get("/User_Cart_Search")
    public async User_Cart_Search(@Query() user_id?: string,): Promise<IResponse> {
        try {
            const cartSearch = await cartModel.find({ user_id: user_id });
            return {
                data: cartSearch,
                error: '',
                message: 'Cart Search Sucessfully',
                status: 200
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error occurred',
                message: 'Failed to Search',
                status: 404
            };
        }

    }
    /**
       * User Cart Search
       */
    @Get("/lookup")
    public async lookup(): Promise<IResponse> {
        try {
            const user = await cartModel.aggregate([
                {
                    $set: {
                        product_id: {
                            $toObjectId: "$product_id"
                        }
                    }
                },
                {
                    $lookup: {
                        from: "productdetails",
                        localField: "product_id",
                        foreignField: "_id",
                        as: "product"
                    }
                }
            ]);
            return {
                data: user,
                error: '',
                message: 'Cart Search Sucessfully',
                status: 200
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error occurred',
                message: 'Failed to Search',
                status: 404
            };
        }

    }
    /**
      * Name Search
      */
    @Get("/name_Search")
    public async name_Search(@Query() name?: string,): Promise<IResponse> {
        try {
            const nameSearch = await productModel.findOne({ name: name });
            return {
                data: nameSearch,
                error: '',
                message: 'Cart Search Sucessfully',
                status: 200
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error occurred',
                message: 'Failed to Search',
                status: 404
            };
        }

    }
    @Post("/fillProduct")
    public async fillProduct(@Body() request: { userId?: mongoose.Types.ObjectId, username?: string, email?: string, password?: string, phoneNumber?: string, address?: string, isBlocked?: string }): Promise<IResponse> {
        try {
            const { userId, username, email, password, phoneNumber, address, isBlocked } = request;
            const { error, value } = await validateFillProduct({ userId, username, email, password, phoneNumber, address, isBlocked })
            if (error) {
                throw new Error(error.message);
            }
            value.password = await bcrypt.hash(value.password, 10);
            console.log(value.password);

            let user = await fillProductModel.create({
                ...value
            });
            return {
                data: user,
                error: '',
                message: 'Product Save Sucessfully',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    /**
       * Gender search
       */
    @Get("/genderSearch")
    public async genderSearch(@Query() _for?: string, @Query() pageNo?: string, @Query() pageSize?: string): Promise<IResponse> {
        try {
            const items = await productModel.find({ _for: { '$regex': _for, $options: 'i' } }).skip((Number(pageNo) - 1) * Number(pageSize)).limit(Number(pageSize));
            return {
                data: items,
                error: '',
                message: 'Gender Search Sucessfully',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }

    }
    @Get("/priceSearch")
    public async priceSearch(@Query() maxPrice?: string): Promise<IResponse> {
        try {
            console.log(maxPrice)
            const items = await productModel.find({ price: { $lt: parseFloat(maxPrice as string) } }).exec();
            return {
                data: items,
                error: '',
                message: 'Price Search Sucessfully',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    @Post("/offerOnProduct")
    public async offerOnProduct(@Body() request: { productId?: string, discount?: string, afterDiscount?: string, startDate?: string, endDate?: string }): Promise<IResponse> {
        try {
            const { productId, discount, afterDiscount, startDate, endDate } = request;
            const { error, value } = await validateOffer({ productId, discount, afterDiscount, startDate, endDate })
            if (error) {
                throw new Error(error.message);
            }
            const user = await offerModel.create({
                ...value
            });
            return {
                data: user,
                error: '',
                message: 'Offer on Product',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
    @Post("/transactions")
    public async transactions(@Body() request: { productId?: string, buyerId: string }): Promise<IResponse> {
        try {
            const { productId, buyerId } = request;
            const product = await productModel.findById({ _id: productId });
            if (!product) {
                message: ({
                    message: `cannot find product with given id: ${productId}`
                })
            }
            console.log(product)
            const isTransacted = await Transaction.findOne({
                product_id: productId
            })
            if (isTransacted) throw ({
                message: {
                    message: `cannot find purchase with given id: ${buyerId}`
                }
            })
            const seller = await adminModel.findById(product?.owner)
            const transaction = await Transaction.create({
                seller_id: product?.owner,
                buyer_id: buyerId,
                product_id: productId
            })
            return {
                data: transaction,
                error: '',
                message: 'Transaction Detail',
                status: 200
            }
        } catch (err) {
            return {
                data: null,
                // @ts-ignore
                error: err.message ? err.message : err,
                message: '',
                status: 400
            }
        }
    }
}


import express, { Request, Response } from 'express'
import AdminController from '../../controllers/admin.controller'
//import { authenticate } from '../../middlewares/auth.middleware'
import { responseWithStatus } from '../../utils/response.utils';
import { upload } from '../../middleware/upload';
const router = express.Router()

router.post('/login', async (req: Request |any , res: Response) => {
    const { email, password } = req.body;
        console.log(email);
    const controller = new AdminController(req, res)
    const response = await controller.login({ email, password });
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.post('/sellerRegistration', async (req: Request | any, res: Response) => {
    const { username, email, password,phoneNumber,address,isBlocked} = req.body;
    const controller = new AdminController(req, res)
    const response = await controller.sellerRegistration({ username, email, password,phoneNumber,address,isBlocked });;
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.post('/sellerLogin', async (req: Request |any , res: Response) => {
    const { email, password } = req.body;
    const controller = new AdminController(req, res)
    const response = await controller.sellerLogin({ email, password });
    const { status } = response;
    return responseWithStatus(res, status, response)
})

router.post('/userRegistration', async (req: Request | any, res: Response) => {
    const { username, email, password,phoneNumber,address,isBlocked} = req.body;
    const controller = new AdminController(req, res)
    const response = await controller.userRegistration({ username, email, password,phoneNumber,address,isBlocked });;
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.post('/userLogin', async (req: Request |any , res: Response) => {
    const { email, password } = req.body;
        console.log(email);
    const controller = new AdminController(req, res)
    const response = await controller.userLogin({ email, password });
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.post('/product',upload.single('product_image'), async (req: Request |any , res: Response) => {
    const {name,type,price,_for,size ,isAvailable ,offer ,owner} = req.body;
    const controller = new AdminController(req, res)
    const response = await controller.product(name,type,price,_for,size ,isAvailable ,offer ,owner,req.file);
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.post('/update',upload.single('product_image'), async (req: Request |any , res: Response) => {
    const {name,type,price,_for,size ,isAvailable ,offer,owner,_id} = req.body;
    const controller = new AdminController(req, res)
    const response = await controller.update(_id,name,type,price,_for,size,isAvailable,offer,owner,req.file);
    const { status } = response;
    return responseWithStatus(res, status, response)
})
router.get('/productSearch', async (req: Request |any , res: Response) => {
    try {
        const { pageNo, pageSize } = req.query;
        const controller = new AdminController(req, res);
        const response = await controller.productSearch(pageNo, pageSize);
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to retrieve',
            status: 500
        });
    }
})
router.get('/Search', async (req: Request |any , res: Response) => {
    try {
        const { name,type} = req.query;
        const controller = new AdminController(req, res);
        const response = await controller.Search(name ,type);
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to retrieve',
            status: 500
        });
    }
})
router.get('/Delete_Product', async (req: Request |any , res: Response) => {
    try {
        const { _id} = req.query;
        const controller = new AdminController(req, res);
        const response = await controller.Delete_Product(_id);
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to Delete Product',
            status: 500
        });
    }
})
router.get('/admin_Search', async (req: Request |any , res: Response) => {
    try {

        const controller = new AdminController(req, res);
        const response = await controller.admin_Search();
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to Search Admin',
            status: 500
        });
    }
})
router.post('/add_to_cart', async (req: Request |any , res: Response) => {
        const {user_id,product_id,quantity} = req.body;
        console.log(user_id,product_id,quantity)
        const controller = new AdminController(req, res);
        const response = await controller.add_to_cart({user_id,quantity,product_id});
        const { status } = response;
        console.log(response)
        return responseWithStatus(res, status, response);
})
router.get('/User_Cart_Search', async (req: Request |any , res: Response) => {
    try {
        const {user_id} = req.query;
        const controller = new AdminController(req, res);
        const response = await controller.User_Cart_Search(user_id);
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to Search Admin',
            status: 500
        });
    }
})
router.get('/lookup', async (req: Request |any , res: Response) => {
    try {
        const controller = new AdminController(req, res);
        const response = await controller.lookup();
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to Search Admin',
            status: 500
        });
    }
})
router.get('/name_Search', async (req: Request |any , res: Response) => {
    try {
        const {name} = req.query;
        const controller = new AdminController(req, res);
        const response = await controller.name_Search(name);
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to Search product',
            status: 500
        });
    }
})
router.post('/fillProduct', async (req: Request |any , res: Response) => {
    const {userId,username,email,password,phoneNumber,address,isBlocked} = req.body;
    console.log(userId,username,email,password,phoneNumber,address,isBlocked)
    const controller = new AdminController(req, res);
    const response = await controller.fillProduct({userId,username,email,password,phoneNumber,address,isBlocked});
    const { status } = response;
    console.log(response)
    return responseWithStatus(res, status, response);
})
router.get('/genderSearch', async (req: Request |any , res: Response) => {
    try {
        const {_for,pageNo,pageSize} = req.query;
        const controller = new AdminController(req, res);
        const response = await controller.genderSearch(_for,pageNo,pageSize);
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to Search product',
            status: 500
        });
    }
})
router.get('/priceSearch', async (req: Request |any , res: Response) => {
    try {
        const {maxPrice} = req.query;
        const controller = new AdminController(req, res);
        const response = await controller.priceSearch(maxPrice);
        const { status } = response;
        return responseWithStatus(res, status, response);
    } catch (error) {
        return responseWithStatus(res, 500, {
            data: null,
            error: 'Error occurred',
            message: 'Failed to Search product',
            status: 500
        });
    }
})
router.post('/offerOnProduct', async (req: Request |any , res: Response) => {
    const {productId,discount,afterDiscount,startDate,endDate} = req.body;
    console.log(productId,discount,afterDiscount,startDate,endDate)
    const controller = new AdminController(req, res);
    const response = await controller.offerOnProduct({productId,discount,afterDiscount,startDate,endDate});
    const { status } = response;
    console.log(response)
    return responseWithStatus(res, status, response);
})
router.post('/transactions', async (req: Request |any , res: Response) => {
    const {productId,buyerId} = req.body;
    const controller = new AdminController(req, res);
    const response = await controller.transactions({productId,buyerId});
    const { status } = response;
    return responseWithStatus(res, status, response);
})

module.exports = router;
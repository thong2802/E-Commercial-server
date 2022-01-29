//libs
const dotenv = require('dotenv'); dotenv.config();
const helmet = require('helmet');
const redis = require('redis');
const nodemailer = require('nodemailer');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongodbConfig = require('./database/config/mongodb.config');

//controllers
const checkConnectionController = require('./controllers/connection/check-connection');

const protectController = require('./controllers/protect/protect');

const handleRegisterController = require('./controllers/register/handle-register');
const handleAuthenticationController = require('./controllers/authentication/handle-authentication');

const loadAccountManageInfoController = require('./controllers/info/load-account-manage-info');
const editAccountInfoController = require('./controllers/account/edit-account-info');
const changeAccountPasswordController = require('./controllers/account/change-account-password');
const updateAccountAvatarController = require('./controllers/account/update-account-avatar');
const forgotAuthenticationPasswordController = require('./controllers/authentication/forgot-authentication-password');
const resetAuthenticationPasswordController = require('./controllers/authentication/reset-authentication-password');

const loadStoreManageInfoController = require('./controllers/info/load-store-manage-info');
const createStoreController = require('./controllers/store/create-store');
const editStoreInfoController = require('./controllers/store/edit-store-info');
const updateStoreLogoController = require('./controllers/store/update-store-logo');

const loadSellingManageProductListController = require('./controllers/selling/load-selling-manage-product-list');

const postProductDetailController = require('./controllers/product/post-product-detail');
const loadProductDetailController = require('./controllers/product/load-product-detail');
const deleteProductController = require('./controllers/product/delete-product');
const searchProductController = require('./controllers/product/search-product');
const editProductDetailController = require('./controllers/product/edit-product-detail');
const deleteProductDetailController = require('./controllers/product/delete-product-detail');
const addProductDetailController = require('./controllers/product/add-product-detail');
const postProductCommentController = require('./controllers/product/post-product-comment');
const loadProductListOnCategoryController = require('./controllers/product/load-product-list-on-category');
const loadProductListOnNameController = require('./controllers/product/load-product-list-on-name');

const addCartItemController = require('./controllers/cart/add-cart-item');
const loadCartItemController = require('./controllers/cart/load-cart-item');
const deleteCartItemController = require('./controllers/cart/delete-cart-item');

const loadOrderListController = require('./controllers/order/load-order-list');
const confirmOrderController = require('./controllers/order/confirm-order');
const postOrderDetailController = require('./controllers/order/post-order-detail');
const cancelOrderController = require('./controllers/order/cancel-order');

//config
const app = express();
const appPort = process.env.APP_PORT;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const emailService = process.env.EMAIL_SERVICE;
const emailServiceAccount = process.env.EMAIL_SERVICE_ACCOUNT;
const emailServicePassword = process.env.EMAIL_SERVICE_PASSWORD;

module.exports.jwtSecret = process.env.JWT_SECRET;
module.exports.mongodbUrl = process.env.MONGODB_URL;
module.exports.clientUrl = process.env.CLIENT_URL;
module.exports.clientRedis = redis.createClient(redisPort, redisHost);
module.exports.emailTransporter = nodemailer.createTransport({
    service: emailService,
    auth: {
        user: emailServiceAccount,
        pass: emailServicePassword
    },
    tls: {
        rejectUnauthorized: false
    }
});

mongodbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(logger("dev"));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: [ "Content-Type", "Origin", "Authorization", "X-Requested-With", "Accept" ],
    methods: "GET, POST"
}));

//routes
app.get('/', checkConnectionController);

app.post('/register/', handleRegisterController);

app.post('/authentication/', handleAuthenticationController);
app.post('/authentication/password/forgot/', forgotAuthenticationPasswordController);
app.post('/authentication/password/reset/', resetAuthenticationPasswordController);

app.get('/account/manage/info/load/', protectController, loadAccountManageInfoController);
app.post('/account/manage/info/edit/', protectController, editAccountInfoController);
app.post('/account/manage/avatar/update/', protectController, updateAccountAvatarController);
app.post('/account/manage/password/change/', protectController, changeAccountPasswordController);

app.get('/store/manage/info/load/', protectController, loadStoreManageInfoController);
app.post('/store/manage/info/edit/', protectController, editStoreInfoController);
app.post('/store/manage/logo/update/', protectController, updateStoreLogoController);
app.post('/store/create/', protectController, createStoreController);

app.get('/selling/manage/product/list/load/', protectController, loadSellingManageProductListController);

app.get('/product/detail/load/', loadProductDetailController);
app.get('/product/manage/detail/delete/', protectController, deleteProductDetailController);
app.get('/product/manage/delete/', protectController, deleteProductController);
app.get('/product/list/category/load/', loadProductListOnCategoryController);
app.post('/product/list/name/load/', loadProductListOnNameController);
app.post('/product/manage/detail/edit/', protectController, editProductDetailController);
app.post('/product/manage/detail/add/', protectController, addProductDetailController);
app.post('/product/detail/post/', protectController, postProductDetailController);
app.post('/product/comment/post/', protectController, postProductCommentController);
app.post('/product/search/', searchProductController);

app.get('/cart/item/load/', protectController, loadCartItemController);
app.get('/cart/item/delete/', protectController, deleteCartItemController);
app.get('/cart/item/add/', protectController, addCartItemController);

app.get('/order/list/load/', protectController, loadOrderListController);
app.get('/order/confirm/', protectController, confirmOrderController);
app.get('/order/cancel/', protectController, cancelOrderController);
app.post('/order/detail/post/', protectController, postOrderDetailController);

//run
app.listen(appPort, () => { console.log(appPort) });
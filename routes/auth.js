const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @api {post} /api/auth/register 用户注册
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} email 邮箱
 * @apiParam {String} [role=employee] 角色(admin/hr/manager/employee)
 *
 * @apiSuccess {String} message 成功消息
 * @apiSuccess {Object} user 用户信息
 * @apiSuccess {Number} user.id 用户ID
 * @apiSuccess {String} user.username 用户名
 * @apiSuccess {String} user.email 邮箱
 * @apiSuccess {String} user.role 角色
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "用户注册成功!",
 *       "user": {
 *         "id": 1,
 *         "username": "admin",
 *         "email": "admin@example.com",
 *         "role": "admin"
 *       }
 *     }
 *
 * @apiError {String} message 错误消息
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "用户名、密码和邮箱不能为空!"
 *     }
 */
router.post('/register', authController.register);

/**
 * @api {post} /api/auth/login 用户登录
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 *
 * @apiSuccess {Number} id 用户ID
 * @apiSuccess {String} username 用户名
 * @apiSuccess {String} email 邮箱
 * @apiSuccess {String} role 角色
 * @apiSuccess {String} accessToken JWT访问令牌
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "username": "admin",
 *       "email": "admin@example.com",
 *       "role": "admin",
 *       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 *
 * @apiError {String} message 错误消息
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "用户名和密码不能为空!"
 *     }
 */
router.post('/login', authController.login);

module.exports = router; 
const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
// const { add_cahce_link, cache_links } = require("../middlewares/cache_middleware");
var cors = require("cors");
const url = require('../controller/smarturl_Controller');
const dashboard_url = require('../controller/dashboardURL_controller');

const idLength = 8;

/**
 * @swagger
 * /goto/{tag}/{shortid}:
 *   post:
 *     summary: Get url from shorten link
 *     tags: [URL]
 *     parameters:
 *       - in: path
 *         name: tag
 *         schema:
 *           type: string
 *         required: true
 *         description: send the tag value from the shorten url
 *       - in : path
 *         name: shortid
 *         schema:
 *           type: string
 *         required: true
 *         description: short url (random characters) after tag
 *       - in : path
 *         name: devicetype
 *         schema:
 *           type: string
 *         required: true
 *         description: send device type
 *       - in : path
 *         name: ostype
 *         schema:
 *           type: string
 *         required: true
 *         description: send OS type
 *       - in : path
 *         name: browsertype
 *         schema:
 *           type: string
 *         required: true
 *         description: send browser type
 *       
 *     responses:
 *       200:
 *         description: get original url with intent 
 *         contens:
 *           application/json:
 *   
 *       404:
 *         description: tag and original URL not found
 */
//router.get('goto/:tag/:shortid', url.get_smarturl);
// router.post('/goto/:tag/:shortid',cors(), cache_links, url.get_smarturl );
router.post('/goto/:tag/:shortid',cors(), url.get_smarturl );



/**
 * @swagger
 * /createOpenURL:
 *   post:
 *     summary: Create short URL for non-loginned Users
 *     tags: [URL]
 *     parameters:
 *       - in: body
 *         name: reqBody
 *         schema:
 *           type: object
 *           properties:
 *             link:
 *               type: string
 *             apptype:
 *               type: string
 *         required:
 *             link
 *             apptype
 *         description: request body
 *     responses:
 *       200:
 *         description: new short url created for user
 *         contens:
 *           application/json:
 *   
 *       404:
 *         description: Short URL not created
 */

 router.post('/createOpenURL',cors(),url.create_openlink);


 //create api for Auth link with loginned Users

 /**
 * @swagger
 * /createUserURL:
 *   post:
 *     summary: Create ShortURL for loginned Users
 *     tags: [URL]
 *     parameters:
 *       - in: body
 *         name: reqBody
 *         schema:
 *           type: object
 *           properties:
 *             link:
 *               type: string
 *             apptype:
 *               type: string
 *             authtoken:
 *               type: string
 *         required:
 *             link
 *             apptype
 *             authtoken
 *         description: request body
 *     responses:
 *       200:
 *         description: new short url created for user
 *         contens:
 *           application/json:
 *   
 *       404:
 *         description: Short URL not created
 */

  router.post('/createUserURL',cors(),url.create_UserLink);


  //api for check if user Exist or not 

  /**
 * @swagger
 * /checkUserExist:
 *   post:
 *     summary: Create if User already exist or not If not then new account will be created 
 *     tags: [USER]
 *     parameters:
 *       - in: body
 *         name: reqBody
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             userid:
 *               type: string
 *         required:
 *             name
 *             email
 *             userid
 *         description: send userid to check is user exist or not 
 *     responses:
 *       200:
 *         description: return true if user exist
 *         contens:
 *           application/json:
 *   
 *       404:
 *         description: some error ocuured
 */

   router.post('/checkUserExist',cors(),url.check_UserExist);


/**
 * @swagger
 * /userdata:
 *   post:
 *     summary: user Dashboard data
 *     tags: [Dashboard]
 *     parameters:
 *       - in: body
 *         name: reqBody
 *         schema:
 *           type: object
 *           properties:
 *             authtoken:
 *               type: string
 *         required:
 *             authtoken
 *         description: request body
 *     responses:
 *       200:
 *         description: new short url created for user
 *         contens:
 *           application/json:
 *   
 *       404:
 *         description: Short URL not created
 */

 router.post('/userdata',cors(),dashboard_url.get_user_dasboard);




module.exports = router;
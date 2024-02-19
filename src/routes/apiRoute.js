import { Router } from 'express';
import { googleAuth } from '../controllers/googleAuth.js';
import vkAuth from '../controllers/vkAuth.js';
import checkWeatherAPI from '../controllers/checkWeatherAPI.js';
import goldShopAPI from '../controllers/goldShopAPI.js';
import vkUpdate from '../controllers/vkUpdate.js';
import getpostsData from '../controllers/getpostsData.js';
import vkMessages from '../models/messages.js';

const router = Router();

router.get('/getpostsData', getpostsData)
router.get('/vkAuth', vkAuth);
router.get('/googleAuth', googleAuth);
router.get('/weather', checkWeatherAPI);
router.get('/goldSilent', goldShopAPI);
router.get('/vk', async (req, res) => {
    res.send(await vkMessages.find({}));
});

router.post('/vk', vkUpdate);

export default router;

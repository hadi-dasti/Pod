import { Router } from 'express';
import { News } from './task.pod.controller';

// validation of req.body
import { validateNewsAgency } from './task.pod.validator';

// Create an instance of the Express router
const router: Router = Router();

// Create an instance of the News controller
const newsController = new News()

// Define the routes and bind the controller methods
router.post('/build_newsAgency', validateNewsAgency, newsController.buildNewsAgency.bind(newsController));
router.put('/update_newsAgency/:id', newsController.updateNewsAgency.bind(newsController));
router.delete('/delete_newsAgency/:id', newsController.deleteNewsAgency.bind(newsController));
router.get('/receive_News_information', newsController.newsInformation.bind(newsController));

export default router;
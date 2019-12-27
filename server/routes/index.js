const express = require('express');
const router = express.Router();

const dataset_controller = require('../controllers/dataset_controller');
const dashboard_controller = require('../controllers/dashboard_controller')


router.get('/', (req, res) => res.status(200).send({
      message: 'Welcome to the BookStore API!',
    }));

router.get('/datasets', dataset_controller.getDataset);
router.get('/datasets/id/:id', dataset_controller.getDatasetById);
router.get('/datasets/name/:name', dataset_controller.getDatasetByName);
router.get('/datasets/year/:year', dataset_controller.getDatasetByYear);

router.get('/datasets/:id', dataset_controller.getAllData);
router.get('/datasets/:id/item/:name_item', dataset_controller.getDataByItems);
router.get('/datasets/:id/data/:name_data', dataset_controller.getDataByParams);
router.get('/datasets/:id/total_item/:name_item', dataset_controller.getTotalByItems);
router.get('/datasets/:id/data/:name_data/:id_data', dataset_controller.getDataById);
router.get('/datasets/:id/coordinates/:id_data', dataset_controller.getCoordinates);

router.get('/dashboard', dashboard_controller.getDashboard);
router.get('/dashboard/id/:id', dashboard_controller.getDashboardById);
router.get('/dashboard/name/:name', dashboard_controller.getDashboardByName);
router.get('/dashboard/year/:year', dashboard_controller.getDashboardByYear);

router.get('/dashboard/:id/data/:name_data', dashboard_controller.getDataDashboard);


module.exports=router;

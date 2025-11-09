import { Router } from 'express';
import { HouseRentController } from './houseRent.controller';

const router = Router();

router.post('/create-house-rent', HouseRentController.createHouseRent);

router.get('/get-all-house-rent', HouseRentController.getAllHouseRent);

router.patch('/update-house-rent/:id', HouseRentController.updateHouseRent);

router.delete('/delete-house-rent/:id', HouseRentController.deleteHouseRent);

export const HouseRentRouter = router;

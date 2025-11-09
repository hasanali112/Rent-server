import { Router } from 'express';
import { HostelRentController } from './hostelRent.controller';

const router = Router();

router.post('/create-hostel-rent', HostelRentController.createHostelRent);

router.get('/get-all-hostel-rent', HostelRentController.getAllHostelRent);

router.patch('/update-hostel-rent/:id', HostelRentController.updateHostelRent);

router.delete('/delete-hostel-rent/:id', HostelRentController.deleteHostelRent);

export const HostelRentRouter = router;

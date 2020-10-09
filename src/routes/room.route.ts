import { Router } from 'express';
import RoomsController from '../controllers/rooms.controller';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class RoomRoutes implements Route {
  public path = '/rooms';
  public router = Router();
  public roomController = new RoomsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:email/`,
      authMiddleware,
      this.roomController.getRoomId
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      this.roomController.createRoom
    );
  }
}

export default RoomRoutes;

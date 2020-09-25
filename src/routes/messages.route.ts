import { Router } from 'express';
import MessageController from '../controllers/messages.controller';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';

class MessageRoute implements Route {
  public path = '/messages';
  public router = Router();
  public messageController = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/summary/`,
      authMiddleware,
      this.messageController.getMessagesSummaryFromUser
    );
    this.router.get(
      `${this.path}/historic/:emailDestinatary`,
      authMiddleware,
      this.messageController.getMessagesFromUser
    );
  }
}

export default MessageRoute;

import { NextFunction, Request, Response } from 'express';
import Messages from 'models/messages.model';
import AuthService from '../services/auth.service';
import MessageService from '../services/messages.service';

class MessagesController {
  constructor(
    private messageService: MessageService = new MessageService(),
    private authService: AuthService = new AuthService()
  ) {}

  public getMessagesSummaryFromUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userToken: string = req.headers.authorization;
      const userId: number = this.authService.getUserIdByToken(userToken);
      const messages: Messages[] = await this.messageService.getMessagesSummaryFromUser(
        userId
      );
      return res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };
}

export default MessagesController;

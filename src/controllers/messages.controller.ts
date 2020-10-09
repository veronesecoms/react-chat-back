import { NextFunction, Request, Response } from 'express';
import Messages from 'models/messages.model';
import AuthService from '../services/auth.service';
import MessageService from '../services/messages.service';
import UserService from '../services/users.service';

class MessagesController {
  constructor(
    private userService: UserService = new UserService(),
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

  public getMessagesFromUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userToken: string = req.headers.authorization;
      const userId: number = this.authService.getUserIdByToken(userToken);
      const emailDestinatary: string = req.params.emailDestinatary;
      const destinataryId: number = await this.userService.getUserIdByEmail(
        emailDestinatary
      );
      const messages: Messages[] = await this.messageService.getMessagesFromUser(
        userId,
        destinataryId
      );
      return res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };

  public saveMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userToken: string = req.body.messageObj.token;
      const userId: number = this.authService.getUserIdByToken(userToken);
      const emailDestinatary: string = req.body.messageObj.emailDestinatary;
      const destinataryId: number = await this.userService.getUserIdByEmail(
        emailDestinatary
      );
      const message = req.body.messageObj.message;
      const createdMessage = await this.messageService.createMessage(
        userId,
        destinataryId,
        message
      );
      return res.status(200).json(createdMessage);
    } catch (error) {
      next(error);
    }
  };
}

export default MessagesController;

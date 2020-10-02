import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import UserService from '../services/users.service';
import RoomsService from '../services/rooms.service';

class RoomsController {
  constructor(
    private authService: AuthService = new AuthService(),
    private userService: UserService = new UserService(),
    private roomService: RoomsService = new RoomsService()
  ) {}

  public createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userCreatingRoomToken: string = req.headers.authorization;
      const userCreatingRoomId: number = this.authService.getUserIdByToken(
        userCreatingRoomToken
      );
      const destinataryRoomEmail: string = req.body.email;
      const destinataryRoomId: number = await this.userService.getUserIdByEmail(
        destinataryRoomEmail
      );
      const roomId: number = await this.roomService.createRoom(
        userCreatingRoomId,
        destinataryRoomId
      );
      return res.status(200).json({ roomId: roomId });
    } catch (error) {
      next(error);
    }
  };

  public getRoomId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userJoiningRoomToken: string = req.headers.authorization;
      const userJoiningRoomId: number = this.authService.getUserIdByToken(
        userJoiningRoomToken
      );
      const destinataryRoomEmail: string = req.params.email;
      const destinataryRoomId: number = await this.userService.getUserIdByEmail(
        destinataryRoomEmail
      );
      const roomId: number | null = await this.roomService.getRoomId(
        userJoiningRoomId,
        destinataryRoomId
      );
      return res.status(200).json({ roomId: roomId });
    } catch (error) {
      next(error);
    }
  };
}

export default RoomsController;

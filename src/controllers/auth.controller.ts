import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { UserDto } from './../dtos/users.dto';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userData: UserDto = req.body;
    try {
      const { jwtToken, findedUser } = await this.authService.login(userData);
      res.status(200).json({
        token: jwtToken,
        data: findedUser,
        message: 'Login realizado com sucesso!'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

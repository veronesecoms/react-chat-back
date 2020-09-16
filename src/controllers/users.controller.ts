import { NextFunction, Request, Response } from 'express';
import User from 'models/users.model';
import AuthService from '../services/auth.service';
import userService from '../services/users.service';

class UsersController {
  public userService = new userService();
  public authService = new AuthService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = Number(req.params.id);

    try {
      const findOneUserData: User = await this.userService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: User = req.body;
    try {
      const createdUserData: User = await this.userService.createUser(userData);
      res.status(201).json({
        data: createdUserData,
        message:
          'Usuário criado com sucesso, verifique no seu e-mail o link para confirmação da conta'
      });
    } catch (error) {
      next(error);
    }
  };

  public confirmEmailUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userToken: string = req.params.token;
    try {
      await this.userService.confirmEmailUser(userToken);
      res.status(200).json({ message: 'Email confirmado com sucesso!' });
    } catch (error) {
      next(error);
    }
  };

  public sendPasswordRecoveryUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userEmail: string = req.params.email;
    try {
      await this.userService.sendEmailPasswordRecovery(userEmail);
      res.status(200).json({
        message:
          'Foi enviado um e-mail com instruções para recuperação da senha!'
      });
    } catch (error) {
      next(error);
    }
  };

  public confirmPasswordRecoveryUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const passwordToken: string = req.params.passwordToken;
    const newPassword: string = req.body.password;
    try {
      await this.userService.confirmPasswordRecovery(
        passwordToken,
        newPassword
      );
      res.status(200).json({
        message: 'Senha alterada com sucesso!'
      });
    } catch (error) {
      next(error);
    }
  };

  public updateProfilePicture = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const profilePicture: string = req.body.picture;
      const userId = this.authService.getUserIdByToken(
        req.headers.authorization
      );
      const user: User = await this.userService.findUserById(userId);
      await user.update({ ...user, picture: profilePicture });
      res.status(200).json({
        message: 'Foto de perfil alterada com sucesso!'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;

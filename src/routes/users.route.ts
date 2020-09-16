import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { UserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    this.router.patch(
      `${this.path}/confirmEmail/:token`,
      this.usersController.confirmEmailUser
    );
    this.router.put(
      `${this.path}/emailRecoveryPassword/:email`,
      this.usersController.sendPasswordRecoveryUser
    );
    this.router.put(
      `${this.path}/confirmEmailRecovery/:passwordToken`,
      this.usersController.confirmPasswordRecoveryUser
    );
    this.router.put(
      `${this.path}/updateProfilePicture`,
      validationMiddleware(UserDto, ['update']),
      this.usersController.updateProfilePicture
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(UserDto, ['create']),
      this.usersController.createUser
    );
  }
}

export default UsersRoute;

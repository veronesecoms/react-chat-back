import * as crypto from "crypto";
import * as bcrypt from "bcryptjs";
import HttpException from "../exceptions/HttpException";
import userModel from "../models/users.model";
import User from "../models/users.model";
import MailerService from "./mailer.service";

class UserService {
  public users = userModel;
  public mailerService = new MailerService();

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.findAll();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async getUserIdByEmail(userEmail: string): Promise<number> {
    const findedUser: User = await this.users.findOne({
      where: { email: userEmail },
    });
    if (!findedUser) {
      throw new HttpException(404, `E-mail especificado não existe`);
    }
    return findedUser.id;
  }

  public async createUser(userData: User): Promise<User> {
    const findedUser: User = await this.users.findOne({
      where: { email: userData.email },
    });
    if (findedUser) {
      throw new HttpException(
        409,
        `O e-mail ${userData.email} já está cadastrado, escolha outro.`
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const generatedEmailToken: string =
      crypto.randomBytes(46).toString("hex") + userData.email;
    const createdUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
      confirm_email_token: generatedEmailToken,
    });

    this.mailerService.sendEmailConfirmation(
      createdUserData.email,
      generatedEmailToken
    );

    return createdUserData;
  }

  public async confirmEmailUser(userToken: string): Promise<User> {
    const user: User = await this.users.findOne({
      where: { confirm_email_token: userToken },
    });
    if (!user) {
      throw new HttpException(400, "Token fornecido não pertence a uma conta");
    }
    const updatedUser: User = await user.update({
      ...user,
      confirm_email_token: null,
      active: true,
    });

    return updatedUser;
  }

  public async sendEmailPasswordRecovery(email: string) {
    const user: User = await this.users.findOne({
      where: { email: email, active: true },
    });
    if (!user) {
      throw new HttpException(400, "Email não pertence a uma conta válida");
    }
    const generatedPasswordToken: string =
      crypto.randomBytes(46).toString("hex") + email;
    await user.update({
      ...user,
      password_recovery_token: generatedPasswordToken,
    });
    this.mailerService.sendEmailRecoveryPassword(email, generatedPasswordToken);
  }

  public async confirmPasswordRecovery(
    passwordToken: string,
    newPassword: string
  ) {
    const user: User = await this.users.findOne({
      where: { password_recovery_token: passwordToken },
    });
    if (!user) {
      throw new HttpException(400, "Token fornecido não pertence a uma conta");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      ...user,
      password: hashedPassword,
      password_recovery_token: null,
    });
  }
}

export default UserService;

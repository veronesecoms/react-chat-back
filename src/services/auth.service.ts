import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import userModel from '../models/users.model';
import { UserDto } from './../dtos/users.dto';

class AuthService {
  public users = userModel;

  public async login(
    userData: UserDto
  ): Promise<{ jwtToken: string; findedUser: UserDto }> {
    const findedUser: UserDto = await this.users.findOne({
      where: { email: userData.email, active: true }
    });
    if (!findedUser)
      throw new HttpException(
        409,
        `Não foi possível encontrar o e-mail ${userData.email}`
      );

    const isPasswordMatching: boolean = await bcrypt.compare(
      userData.password,
      findedUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, 'E-mail ou senha incorretos');

    const tokenData: TokenData = this.createToken(findedUser.id);
    const jwtToken: string = tokenData.token;

    return { jwtToken, findedUser };
  }

  public createToken(userId: number): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: userId };
    const secret: string = process.env.JWT_SECRET;
    return {
      token: jwt.sign(dataStoredInToken, secret)
    };
  }

  public getUserIdByToken(token: string): number {
    const decodedJwt = jwt.decode(token, { complete: true, json: true });
    if (!decodedJwt) {
      throw new HttpException(400, 'Token fornecido não é válido');
    }
    return decodedJwt.payload.id;
  }
}

export default AuthService;

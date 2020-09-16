import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEmpty,
  Length
} from 'class-validator';
import { HasMaxSize } from '../utils/decorators/maxBase64Size';

export class UserDto {
  @IsEmpty({
    groups: ['login, create'],
    message: 'Não é possível especificar um id na criação de usuário'
  })
  public id: number;

  @IsEmpty({
    groups: ['login, create'],
    message: 'Não é possível especificar um token para confirmação de email'
  })
  public confirm_email_token: string;

  @IsString({
    groups: ['create']
  })
  @Length(0, 60, {
    message: 'Tamanho máximo do campo Nome: 60 caracteres',
    groups: ['create']
  })
  @IsNotEmpty({
    message: 'Necessário preenchimento do campo Nome',
    groups: ['create']
  })
  public first_name: string;

  @IsString()
  @Length(0, 60, {
    message: 'Tamanho máximo do campo Sobrenome: 60 caracteres',
    groups: ['create']
  })
  @IsNotEmpty({
    message: 'Necessário preenchimento do campo Sobrenome',
    groups: ['create']
  })
  public second_name: string;

  @IsEmail(undefined, {
    message: 'Email não possui formato correto',
    groups: ['login, create']
  })
  @Length(0, 60, {
    message: 'Tamanho máximo do campo Email: 60 caracteres',
    groups: ['login, create']
  })
  @IsNotEmpty({
    message: 'Necessário preenchimento do campo Email',
    groups: ['login, create']
  })
  public email: string;

  @IsString({ groups: ['login, create'] })
  @IsNotEmpty({ message: 'Necessário preenchimento do campo Senha' })
  public password: string;

  @IsEmpty({
    groups: ['create'],
    message: 'Não é possível inserir uma foto na criação de usuário'
  })
  @IsString({ groups: ['update'] })
  @HasMaxSize(2097152, {
    groups: ['update'],
    message: 'Tamanho de imagem não pode exceder 2MB'
  })
  public picture: string;
}

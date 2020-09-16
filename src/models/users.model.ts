import { Model, Table, Column, DefaultScope } from 'sequelize-typescript';

@Table({
  modelName: 'user',
  timestamps: true,
  paranoid: true
})
export default class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  email: string;
  @Column
  password: string;
  @Column
  first_name: string;
  @Column
  second_name: string;
  @Column
  confirm_email_token: string;
  @Column
  active: boolean;
  @Column
  password_recovery_token: string;
  @Column
  picture: string;
}

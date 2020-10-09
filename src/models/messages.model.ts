import { Model, Table, Column } from 'sequelize-typescript';

@Table({
  modelName: 'messages',
  timestamps: true,
  paranoid: true
})
export default class Messages extends Model<Messages> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  from_user_id: number;
  @Column
  to_user_id: number;
  @Column
  body: string;
}

import { Model, Table, Column } from 'sequelize-typescript';

@Table({
  modelName: 'rooms',
  timestamps: true,
  paranoid: true,
})
export default class Rooms extends Model<Rooms> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  id_user_created_room: number;
  @Column
  id_user_joined_room: number;
}

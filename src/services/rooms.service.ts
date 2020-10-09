import { Op } from 'sequelize';
import Rooms from '../models/rooms.model';
import roomsModel from '../models/rooms.model';

class RoomsService {
  public rooms = roomsModel;

  public async createRoom(
    userCreatingRoomId: number,
    destinataryRoomId: number
  ): Promise<number> {
    const createdRoom: Rooms = await this.rooms.create({
      id_user_created_room: userCreatingRoomId,
      id_user_joined_room: destinataryRoomId,
    });
    return createdRoom.id;
  }

  public async getRoomId(
    userJoiningRoomId: number,
    destinataryRoomId: number
  ): Promise<number | null> {
    const findedRoom: Rooms = await this.rooms.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { id_user_created_room: userJoiningRoomId },
              { id_user_joined_room: destinataryRoomId },
            ],
          },
          {
            [Op.and]: [
              { id_user_created_room: destinataryRoomId },
              { id_user_joined_room: userJoiningRoomId },
            ],
          },
        ],
      },
    });
    if (findedRoom) {
      return findedRoom.id;
    } else {
      return null;
    }
  }
}

export default RoomsService;

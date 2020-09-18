import Messages from '../models/messages.model';
import messageModel from '../models/messages.model';
import { sequelize } from './../models/index.model';

class MessageService {
  public messages = messageModel;

  public async getMessagesSummaryFromUser(userId: number): Promise<Messages[]> {
    const messages: Messages[] = await sequelize.query(
      'SELECT T1.id, T1.body, T1."createdAt", u.email, u.first_name, u.picture FROM messages T1 INNER JOIN users u ON (T1.from_user_id <> ? AND T1.from_user_id = u.id) OR (T1.to_user_id <> ? AND T1.to_user_id = u.id) WHERE (from_user_id = ? OR to_user_id = ?) AND T1."createdAt" = (SELECT MAX("createdAt") FROM messages T2 WHERE T1.from_user_id = T2.from_user_id AND T1.to_user_id = T2.to_user_Id ) ORDER BY T1."createdAt" DESC',
      {
        replacements: [userId, userId, userId, userId],
        type: 'SELECT'
      }
    );
    return messages;
  }
}

export default MessageService;

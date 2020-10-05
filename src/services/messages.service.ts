import Messages from '../models/messages.model';
import messageModel from '../models/messages.model';
import { sequelize } from './../models/index.model';

class MessageService {
  public messages = messageModel;

  public async getMessagesSummaryFromUser(userId: number): Promise<Messages[]> {
    const messages: Messages[] = await sequelize.query(
      `
        SELECT t1.*,
        u.first_name,
        u.email,
        u.picture
        FROM   messages AS t1
        INNER JOIN users u
                ON ( T1.from_user_id <> ?
                      AND T1.from_user_id = u.id )
                    OR ( T1.to_user_id <> ?
                          AND T1.to_user_id = u.id )
        INNER JOIN (SELECT Least(to_user_id, from_user_id)    AS sender_id,
                            Greatest(to_user_id, from_user_id) AS receiver_id,
                            Max(id)                            AS max_id
                    FROM   messages
                    GROUP  BY Least(to_user_id, from_user_id),
                              Greatest(to_user_id, from_user_id)) AS t2
                ON Least(t1.to_user_id, t1.from_user_id) = t2.sender_id
                    AND Greatest(t1.to_user_id, t1.from_user_id) = t2.receiver_id
                    AND t1.id = t2.max_id
        WHERE  t1.to_user_id = ?
                OR t1.from_user_id = ?
        ORDER  BY t1."createdAt" DESC
      `,
      {
        replacements: [userId, userId, userId, userId],
        type: 'SELECT',
      }
    );
    return messages;
  }

  public async getMessagesFromUser(
    userId: number,
    destinataryId: number
  ): Promise<Messages[]> {
    const messages: Messages[] = await sequelize.query(
      `
        SELECT m.*, u.email, u.picture, u.first_name
        FROM messages m
        INNER JOIN users u
        ON(m.from_user_id = u.id)
        WHERE m.to_user_id = ? AND m.from_user_id = ?
        OR m.to_user_id = ? and m.from_user_id = ?
        ORDER BY "createdAt"
      `,
      {
        replacements: [userId, destinataryId, destinataryId, userId],
        type: 'SELECT',
      }
    );
    return messages;
  }

  public async createMessage(
    userId: number,
    destinataryId: number,
    message: string
  ) {
    const createdMessage: Messages = await this.messages.create({
      from_user_id: userId,
      to_user_id: destinataryId,
      body: message,
    });
    return createdMessage;
  }
}

export default MessageService;

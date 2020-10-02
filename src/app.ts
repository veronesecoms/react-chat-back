import * as http from 'http';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as logger from 'morgan';
import * as socketIo from 'socket.io';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { sequelize } from './models/index.model';

class App {
  public app: express.Application;
  public http: any;
  public port: string | number;
  public env: boolean;
  public io: SocketIO.Server;

  constructor(routes: Routes[]) {
    this.app = express();
    this.http = new http.Server(this.app);
    this.io = socketIo(this.http);
    this.port = process.env.PORT || 3100;
    this.env = process.env.NODE_ENV === 'production';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.io.on('connection', (userSocket) => {
      userSocket.on('join_room', (roomId) => {
        userSocket.join(roomId);
      });
      userSocket.on('message', (data) => {
        userSocket.to(data.roomId).emit('room_message', data.message);
      });
    });

    this.http.listen(this.port, async () => {
      console.log(`🚀 App listening on the port ${this.port}`);
      try {
        await sequelize.authenticate();
        console.log(
          'Connection with database has been established successfully. Sickening no?'
        );
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
      this.app.use(logger('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(express.json({ limit: '2mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '2mb' }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

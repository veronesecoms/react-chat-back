import "dotenv/config";
import App from "./app";
import AuthRoute from "./routes/auth.route";
import MessageRoute from "./routes/messages.route";
import UsersRoute from "./routes/users.route";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([new UsersRoute(), new AuthRoute(), new MessageRoute()]);

app.listen();

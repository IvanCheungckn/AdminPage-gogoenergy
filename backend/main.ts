import { UserService } from "./services/UserService";
import { UserRouter } from "./routers/UserRouter";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();
dotenv.config()
/* Enable cors */
app.use(cors({
  origin: [
    process.env.REACT_APP_FRONTEND_URL!
  ]
}))

/* Services */
const userService = new UserService();

/* Routers */
const userRouter = new UserRouter(userService);

/* Body parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Routes */
app.use('/api/users', userRouter.router())

/* Listening port */
const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

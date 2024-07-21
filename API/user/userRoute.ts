import * as express from "express";
import { register } from "./userControl";


const router = express.Router();

router
.post('/register', register);

export default router;
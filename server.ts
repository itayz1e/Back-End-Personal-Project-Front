import express from 'express';
import cors from "cors";
import userRoute from "./API/user/userRoute";

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/user', userRoute)

app.listen(3000, () => {
  console.log(`runnig on 3000`)
})


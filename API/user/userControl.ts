import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";


export const register = async (req: any, res: any) => {
    try {
      const { userName, email, password } = req.body;
      console.log({ userName, email, password });
      const salt = bcrypt.genSaltSync(10);
      const passHash = bcrypt.hashSync(password, salt);

      const userDB = { userName, email, password: passHash };
      res.status(201).send({ ok: true, userDB });
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  };



// const token = jwt.sign({ accessToken: passHash }, secret, {
//   expiresIn: '1h',
//   issuer: 'your-app',
//   audience: 'your-audience',
// });

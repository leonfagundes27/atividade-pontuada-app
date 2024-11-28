import bcrypt from 'bcrypt';
import { loginService, genereteToken } from '../services/auth.service.js';

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginService(email);
        if (!user) {
            return res.status(400).send({ err: 'E-mail  inválido!' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ err: 'Senha inválida!' });
        }

        const token = genereteToken(user.id, user.email);

        return res.status(200).send({ token }); 
    } catch (err) {
        return res.status(500).send({ err: "Erro no login" });
    }
};

export { loginController };

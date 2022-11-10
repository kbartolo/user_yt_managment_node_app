import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';

const userUpdateEmailController = async (req, res) => {
    const { id } = req;
    const { email, password } = req.body;
    const user = await UserModel.findById(id).exec();
    if (!user)
        return res.status(401).send({ errors: ['Usuario no autorizado'] });

    const checkPassword = await compare(password, user.password);
    if (!checkPassword)
        return res.status(401).send({ errors: ['Credenciales incorrectas'] });

    user.email = email;
    await user.save();
    const result = {
        response: {
            message: 'Correo actualizado Correctamente.',
        },
    };
    return res.send(result);
};

export default userUpdateEmailController;

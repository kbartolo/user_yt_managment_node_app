import UserModel from '#Schemas/user.schema.js';
import { SALT } from '#Constants/salt.js';
import { compare, hash } from 'bcrypt';

const userUpdatePasswordController = async (req, res) => {
    const { id } = req;
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findById(id).exec();
    if (!user)
        return res.status(401).send({ error: ['El usuario no es válido.'] });

    const hashPassword = await compare(oldPassword, user.password);
    if (!hashPassword)
        return res
            .status(401)
            .send({ error: ['La contraseña es incorrecta.'] });

    const newHashedPassword = await hash(newPassword, SALT);
    user.password = newHashedPassword;
    await user.save();
    const result = {
        response: {
            message: 'Contraseña actualizada Correctamente.',
        },
    };
    return res.send(result);
};

export default userUpdatePasswordController;

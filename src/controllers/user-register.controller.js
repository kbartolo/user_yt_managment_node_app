import UserModel from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';
import { SALT } from '#Constants/salt.js';
// Uso Bcrypt para generar un hash del password para: yarn add bcrypt, a su vez está creada en su base con c++
// y es más eficiente que decrypt

const userRegisterController = async (req, res) => {
    const { _id, name, surname, email, password } = req.body;

    const existingUserById = await UserModel.findById(_id).exec();
    if (existingUserById) return res.status(409).send('El usuario ya existe.');

    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (existingUserByEmail)
        return res.status(409).send('El emal ya está registrado.');

    const hashPassword = await hash(password, SALT);
    const newUser = new UserModel({
        _id,
        name,
        surname,
        email,
        password: hashPassword,
    });
    await newUser.save();
    return res.status(201).send('Usuario registrado con éxito');
};

export default userRegisterController;

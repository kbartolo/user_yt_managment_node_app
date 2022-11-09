import UserModel from '#Schemas/user.schema.js';
const userUpdateDataController = async (req, res) => {
    const { id } = req;
    const { name, surname } = req.body;
    const user = await UserModel.findById(id).exec();
    if (!user)
        return res.status(401).send({ error: ['El usuario no es válido.'] });
    user.name = name;
    user.surname = surname;
    await user.save();
    return res.send('Usuario Actualizado.');
};

export default userUpdateDataController;

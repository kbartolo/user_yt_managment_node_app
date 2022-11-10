import UserModel from '#Schemas/user.schema.js';

const userDeleteController = async (req, res) => {
    const { id } = req;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['Usuario no autorizado'] });

    await existingUserById.delete();
    const result = {
        response: {
            message: 'User deleted.',
        },
    };
    return res.send(result);
};

export default userDeleteController;

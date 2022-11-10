import UserModel from '#Schemas/user.schema.js';
const userProfileController = async (req, res) => {
    const { id } = req;
    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['Usuario no autorizado'] });

    const { _id, name, surname, email } = existingUserById;
    const result = {
        response: {
            message: 'Profile user data.',
            data: { _id, name, surname, email },
        },
    };
    return res.send(result);
};

export default userProfileController;

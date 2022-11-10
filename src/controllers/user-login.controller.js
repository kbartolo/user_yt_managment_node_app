import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';

const userLoginController = async (req, res) => {
    const { email, password } = req.body;
    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (!existingUserByEmail)
        return res.status(401).send({ errors: ['Credenciales incorrectas'] });

    const hashPassword = await compare(password, existingUserByEmail.password);
    if (!hashPassword)
        return res.status(401).send({ errors: ['Credenciales incorrectas'] });
    const newJWT = new SignJWT({ id: existingUserByEmail._id });
    const encoder = new TextEncoder();
    const jwt = await newJWT
        .setProtectedHeader({
            alg: 'HS256',
            typ: 'JWT',
        })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encoder.encode(process.env.JWT_PRIVATE_SECRET));

    const result = {
        response: "User's login correct",
        jwt,
    };
    return res.send(result);
};

export default userLoginController;

import { jwtVerify } from 'jose';

const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send('Usuario inválido');
    // FOrmato Bearer Authorization: Bearer 486vfshFDGH...
    const jwt = authorization.split(' ')[1];
    if (!jwt) return res.status(401).send('Usuario no autorizado.');

    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(
            jwt,
            encoder.encode(process.env.JWT_PRIVATE_SECRET)
        );

        req.id = payload.id;
        next();
    } catch (errorMessage) {
        return res
            .status(401)
            .send({ errors: ['Usuario no autorizado - catch' + errorMessage] });
    }
};
export default userJWTDTO;

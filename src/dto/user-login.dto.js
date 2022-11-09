import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { groupByKey } from '#Utils/utils.js';
import { emailDTOSchema, passwordDTOSchema } from '#Dto/user-dto.types.js';

const loginDTOSchema = Type.Object(
    {
        email: emailDTOSchema,
        password: passwordDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'El formato del objeto no es válido',
        },
    }
);

const ajv = new Ajv({ allErrors: true });

// Añadiendo validación personalizada con addFormat
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateLogin = ajv.compile(loginDTOSchema);

const userLoginDTO = (req, res, next) => {
    const isDTOValid = validateLogin(req.body);
    if (!isDTOValid)
        return res
            .status(400)
            .send(groupByKey(validateLogin.errors, 'message'));
    next();
};
export default userLoginDTO;

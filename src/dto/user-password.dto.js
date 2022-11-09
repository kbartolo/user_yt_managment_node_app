import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import { groupByKey } from '#Utils/utils.js';
import { passwordDTOSchema } from '#Dto/user-dto.types.js';

const registerDTOSchema = Type.Object(
    {
        oldPassword: passwordDTOSchema,
        newPassword: passwordDTOSchema,
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
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .addKeyword('kind')
    .addKeyword('modifier');
addErrors(ajv);

const validatePassword = ajv.compile(registerDTOSchema);

const userPasswordDTO = (req, res, next) => {
    const isDTOValid = validatePassword(req.body);
    if (!isDTOValid)
        return res
            .status(400)
            .send(groupByKey(validatePassword.errors, 'message'));
    next();
};
export default userPasswordDTO;

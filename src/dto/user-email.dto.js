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

const validateEmail = ajv.compile(loginDTOSchema);

const userEmailDTO = (req, res, next) => {
    const isDTOValid = validateEmail(req.body);
    if (!isDTOValid)
        return res
            .status(400)
            .send(groupByKey(validateEmail.errors, 'message'));
    next();
};
export default userEmailDTO;

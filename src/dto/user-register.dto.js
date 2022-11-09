import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { groupByKey } from '#Utils/utils.js';
import {
    idDTOSchema,
    nameDTOSchema,
    surnameDTOSchema,
    emailDTOSchema,
    passwordDTOSchema,
} from '#Dto/user-dto.types.js';

const registerDTOSchema = Type.Object(
    {
        _id: idDTOSchema,
        name: nameDTOSchema,
        surname: surnameDTOSchema,
        email: emailDTOSchema,
        password: passwordDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'El objeto enviado es inválido.',
        },
    }
);

const ajv = new Ajv({ allErrors: true });

// Añadiendo validación personalizada con addFormat
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateRegister = ajv.compile(registerDTOSchema);

const userRegisterDTO = (req, res, next) => {
    const isDTOValid = validateRegister(req.body);
    if (!isDTOValid)
        return res
            .status(400)
            .send(groupByKey(validateRegister.errors, 'message'));
    next();
};
export default userRegisterDTO;

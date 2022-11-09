import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import { groupByKey } from '#Utils/utils.js';
import { nameDTOSchema, surnameDTOSchema } from '#Dto/user-dto.types.js';

const registerDTOSchema = Type.Object(
    {
        name: nameDTOSchema,
        surname: surnameDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'El formato del objeto no es válido',
        },
    }
);

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier');
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

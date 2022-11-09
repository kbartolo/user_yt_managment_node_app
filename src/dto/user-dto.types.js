import { Type } from '@sinclair/typebox';

export const idDTOSchema = Type.String({
    format: 'uuid',
    errorMessage: {
        type: 'El tipo de _id no es válido',
        format: 'EL formato debe ser un uuid4',
    },
});

export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: 'Name field must be at least 2 characters',
        maxLength: 'Name field must be maximun 20 characters',
    },
});

export const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'Surname field must be at least 4 characters',
        maxLength: 'Surname field must be maximun 50 characters',
    },
});

export const emailDTOSchema = Type.String({
    format: 'email',
    minLength: 2,
    errorMessage: {
        type: 'El tipo de email debe ser un string',
        format: 'El formato de correo no es válido',
    },
});

export const passwordDTOSchema = Type.String({
    format: 'password',
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: 'El tipo de la password debe ser un string',
        format: 'Debe tener al menos una minúscula, mayúscula y un número.',
        minLength: 'Mínimo 10 caracteres de longitud.',
        maxLength: 'Máximo 50 caracteres de longitud.',
    },
});

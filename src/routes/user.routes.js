import { Router } from 'express';
import {
    userRegisterDTO,
    userLoginDTO,
    userDataDTO,
    userEmailDTO,
    userPasswordDTO,
    userJWTDTO,
} from '#Dto/index.js';

import {
    userRegisterController,
    userLoginController,
    userProfileController,
    userUpdateDataController,
    userUpdateEmailController,
    userUpdatePasswordController,
    userDeleteController,
} from '#Controllers/index.js';

const userRouter = Router();

userRouter.post('/register', userRegisterDTO, userRegisterController);
userRouter.post('/login', userLoginDTO, userLoginController);
userRouter.get('/profile', userJWTDTO, userProfileController);
userRouter.patch(
    '/update-data',
    userJWTDTO,
    userDataDTO,
    userUpdateDataController
);

userRouter.patch(
    '/update-email',
    userJWTDTO,
    userEmailDTO,
    userUpdateEmailController
);
userRouter.patch(
    '/update-password',
    userJWTDTO,
    userPasswordDTO,
    userUpdatePasswordController
);

userRouter.delete('/delete', userJWTDTO, userDeleteController);

export default userRouter;

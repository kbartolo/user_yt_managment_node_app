import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, require: true, minLength: 2, maxLength: 20 },
    surname: { type: String, require: true, minLength: 4, maxLength: 50 },
    email: { type: String, require: true },
    password: { type: String, require: true },
});
export default userSchema;

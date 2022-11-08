import mongoose from 'mongoose';

const connectDB = async (port) => {
    await mongoose.connect(port);
};

export default connectDB;

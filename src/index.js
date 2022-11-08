import '#Config/env.js';
import httpServer from '#Config/httpServer.js';
import connectDB from '#Config/db.js';

const bootServer = async () => {
    await connectDB(process.env.MONGO_URL);
    httpServer.listen(process.env.PORT, () => {
        console.log('Listening on port ' + process.env.PORT);
    });
};

bootServer();

import '#Config/env.js';
import httpServer from '#Config/httpServer.js';
import connectDB from '#Config/db.js';

const bootServer = async () => {
    await connectDB(process.env.MONGO_URL);
    const port = process.env.PORT || 3000;
    httpServer.listen(process.env.PORT || 3000, () => {
        console.log('Listening on port ' + port);
    });
};

bootServer();

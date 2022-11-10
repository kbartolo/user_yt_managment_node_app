import path from 'path';
import fs from 'fs';

export const groupByKey = (arr, key) => {
    if (!arr) return null;
    return { [key]: arr.map((item) => item[key]) };
};

export const readFile = (dirname, fileLocation, encode) =>
    fs.readFileSync(path.resolve(dirname, fileLocation), encode);

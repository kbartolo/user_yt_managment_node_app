export const groupByKey = (arr, key) => {
    if (!arr) return null;
    return { [key]: arr.map((item) => item[key]) };
};

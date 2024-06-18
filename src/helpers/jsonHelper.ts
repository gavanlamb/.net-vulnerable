function isValidJSON(
    input: string): boolean {
    try {
        JSON.parse(input);
        return true;
    } catch (e) {
        return false;
    }
}

export {
    isValidJSON
};

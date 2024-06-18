import {
    isValidJSON
} from '../../src/helpers/jsonHelper';

describe('getStringInput', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    test.each([
        ['', false],
        ['{}', true],
        ['Error encountered', false],
    ])('should return null when the input is "%s"', async (input: string, expected: boolean) => {
        const result = isValidJSON(input);

        expect(result).toBe(expected);
    });
});

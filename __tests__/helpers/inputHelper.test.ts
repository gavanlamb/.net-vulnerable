describe('getBooleanInput', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    test.each([
        ['true'],
        ['TRUE'],
        ['True'],
        ['tRue'],
        ['trUe'],
        ['truE']
    ])('should return true if the input is "%s"', async (value: string) => {
        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const name = "inputName";

        const { getBooleanInput } = await import("../../src/helpers/inputHelper");
        const result = getBooleanInput(name, false);

        expect(result).toBe(true);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve boolean input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved boolean input for: ${name} with a value of '${value}'`);
        expect(debugMock).toHaveBeenCalledWith(`The retrieved boolean input value for: ${name} parsed to: 'true'`);
    });

    test.each([
        ['false'],
        ['FALSE'],
        ['False'],
        ['fAlse'],
        ['faLse'],
        ['falSe'],
        ['falsE'],
    ])('should return false if the input is "%s"', async (value: string) => {
        const name = "inputName";
        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getBooleanInput } = await import("../../src/helpers/inputHelper");
        const result = getBooleanInput(name, true);

        expect(result).toBe(false);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve boolean input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved boolean input for: ${name} with a value of '${value}'`);
        expect(debugMock).toHaveBeenCalledWith(`The retrieved boolean input value for: ${name} parsed to: 'false'`);
    });

    test.each([
        ['', true],
        [null, true],
        [undefined, true],
        ['', false],
        [null, false],
        [undefined, false]
    ])('should return the default value if "%s" is provided', async (value: string | undefined | null, defaultValue: boolean) => {
        const name = "inputName";

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getBooleanInput } = await import("../../src/helpers/inputHelper");
        const result = getBooleanInput(name, defaultValue);

        expect(result).toBe(defaultValue);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve boolean input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved boolean input for: ${name} with a value of '${value}'`);
        expect(debugMock).toHaveBeenCalledWith(`The retrieved boolean value for: ${name} is '${value}' which is not valid. The default value '${defaultValue}' will be returned`);
    });

    test.each([
        ['invalid'],
        ['F A L S E'],
        ['T R U E']
    ])('should throw an InvalidGitHubActionInputError when the input is "%s"', async (value: string) => {
        const name = "inputName";

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getBooleanInput } = await import("../../src/helpers/inputHelper");
        const exec = (): boolean => getBooleanInput(name, false);

        expect(exec).toThrow(`The retrieved boolean value for: ${name} is ${value}, expected values are 'true' or 'false'`);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve boolean input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved boolean input for: ${name} with a value of '${value}'`);
    });
});

describe('getIntegerInput', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    test.each([
        ['5', 5],
        ['0', 0],
        ['3.14', 3],
        ['3.94', 3],
        ['-3', -3],
    ])('should return the correct integer when the input is "%s"', async (value, expected) => {
        const name = "inputName";

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getIntegerInput } = await import("../../src/helpers/inputHelper");
        const result = getIntegerInput(name);

        expect(result).toBe(expected);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve integer input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved integer input for: ${name} with a value of '${value}'`);
        expect(debugMock).toHaveBeenCalledWith(`The retrieved integer input value for: ${name} parsed to: '${expected}'`);
    });

    test.each([
        [undefined],
        [''],
        [null]
    ])('should return null when the input is "%s"', async (value) => {
        const name = "inputName";

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getIntegerInput } = await import("../../src/helpers/inputHelper");
        const result = getIntegerInput(name);

        expect(result).toBeNull();
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve integer input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved integer input for: ${name} with a value of '${value}'`);
        expect(debugMock).toHaveBeenCalledWith(`The retrieved boolean value for: ${name} is '${value}' which is not valid. Null will be returned`);
    });

    test.each([
        ['abc'],
        ['!@#$%^&*()'],
    ])('should throw an error when the input is "%s"', async (value) => {
        const name = "inputName";
        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getIntegerInput } = await import("../../src/helpers/inputHelper");
        const exec = (): number | null => getIntegerInput(name);

        expect(exec).toThrow(`The retrieved integer value for: ${name} is ${value}, which is deemed to be a NaN`);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve integer input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved integer input for: ${name} with a value of '${value}'`);
    });
});

describe('getStringInput', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    test.each([
        ['test'],
        ['   ']
    ])('should return the string when the input is "%s"', async (value) => {
        const name = "inputName";

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getStringInput } = await import("../../src/helpers/inputHelper");
        const result = getStringInput(name);

        expect(result).toBe(value);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve string input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved string input for: ${name} with a value of '${value}'`);
    });

    test.each([
        ['']
    ])('should return null when the input is "%s"', async (value) => {
        const name = "inputName";

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getStringInput } = await import("../../src/helpers/inputHelper");
        const result = getStringInput(name);

        expect(result).toBeNull();
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve string input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved string input for: ${name} with a value of '${value}'`);
        expect(debugMock).toHaveBeenCalledWith(`The retrieved string value for: ${name} is '${value}' which is not valid. Null will be returned`);
    });
});

describe('getStringArrayInput', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('should return array for comma-separated input', async () => {
        const name = "inputName";
        const value = 'value1,value2,value3';

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getStringArrayInput } = await import("../../src/helpers/inputHelper");
        const result = getStringArrayInput(name);

        expect(result).toEqual(['value1', 'value2', 'value3']);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve string input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved string input for: ${name} with a value of 'value1,value2,value3'`);
    });

    it('should return empty array for empty input', async () => {
        const name = "inputName";
        const value = '';

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getStringArrayInput } = await import("../../src/helpers/inputHelper");
        const result = getStringArrayInput(name);

        expect(result).toEqual([]);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve string input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved string input for: ${name} with a value of ''`);
        expect(debugMock).toHaveBeenCalledWith(`The retrieved string value for: ${name} is '' which is not valid. Null will be returned`);
    });
});

describe('getStringInputAndValidateAgainstAllowedValues', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('should return valid value within allowed values', async () => {
        const name = "inputName";
        const value = "allowedValue";
        const allowedValues = [value];

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getStringInputAndValidateAgainstAllowedValues } = await import("../../src/helpers/inputHelper");
        const result = getStringInputAndValidateAgainstAllowedValues(name, allowedValues);

        expect(result).toBe('allowedValue');
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve string input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved string input for: ${name} with a value of '${value}'`);
        expect(debugMock).toHaveBeenCalledWith(`The retrieved string input value for: ${name} is: '${value}', which is one of the expected values ${allowedValues.join(',')}.`);
    });

    it('should return null for empty input', async () => {
        const name = "inputName";
        const value = "";
        const allowedValues = [value];

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getStringInputAndValidateAgainstAllowedValues } = await import("../../src/helpers/inputHelper");
        const result = getStringInputAndValidateAgainstAllowedValues(name, allowedValues);

        expect(result).toBeNull();
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve string input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved string input for: ${name} with a value of ''`);
        expect(debugMock).toHaveBeenCalledWith(`No value provided for: ${name}, returning default: null`);
    });

    it('should throw error for invalid input', async () => {
        const name = "inputName";
        const value = "invalid";
        const allowedValues = ["allowedValue"];

        const debugMock = jest.fn();
        const getInputMock = jest.fn().mockReturnValue(value);
        jest.doMock("@actions/core", () => ({ debug: debugMock, getInput: getInputMock }));

        const { getStringInputAndValidateAgainstAllowedValues } = await import("../../src/helpers/inputHelper");
        const exec = (): string | null => getStringInputAndValidateAgainstAllowedValues(name, allowedValues);

        expect(exec).toThrow(`The retrieved string value for: ${name} is ${value}, which is not one of the expected values ${allowedValues.join(', ')}.`);
        expect(getInputMock).toHaveBeenCalledWith(name);
        expect(debugMock).toHaveBeenCalledWith(`Going to retrieve string input for: ${name}`);
        expect(debugMock).toHaveBeenCalledWith(`Retrieved string input for: ${name} with a value of 'invalid'`);
    });
});
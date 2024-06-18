import {
    debug,
    getInput
} from '@actions/core';
import {
    InvalidGitHubActionInputError
} from "../errors/invalidGitHubActionInputError";

/**
 * Gets a boolean input from the GitHub Actions workflow.
 * @param inputName The name of the input to retrieve.
 * @param defaultValue The default value to return if no value is provided.
 */
function getBooleanInput(
    inputName: string,
    defaultValue: boolean): boolean {
    debug(`Going to retrieve boolean input for: ${inputName}`);

    const valueStr = getInput(inputName);
    debug(`Retrieved boolean input for: ${inputName} with a value of '${valueStr}'`);

    if (valueStr === null || valueStr === undefined || valueStr === '') {
        debug(`The retrieved boolean value for: ${inputName} is '${valueStr}' which is not valid. The default value '${defaultValue}' will be returned`);
        return defaultValue;
    }

    const lowerValueStr = valueStr.toLowerCase();
    if (lowerValueStr !== 'true' && lowerValueStr !== 'false') {
        throw new InvalidGitHubActionInputError(
            inputName,
            `The retrieved boolean value for: ${inputName} is ${valueStr}, expected values are 'true' or 'false'`);
    }

    const value = lowerValueStr === 'true';
    debug(`The retrieved boolean input value for: ${inputName} parsed to: '${value}'`);

    return value;
}

/**
 * Gets an integer input from the GitHub Actions workflow.
 * @param inputName The name of the input to retrieve.
 */
function getIntegerInput(
    inputName: string): number | null {
    debug(`Going to retrieve integer input for: ${inputName}`);

    const valueStr = getInput(inputName);
    debug(`Retrieved integer input for: ${inputName} with a value of '${valueStr}'`);

    if (valueStr === null || valueStr === undefined || valueStr === '') {
        debug(`The retrieved boolean value for: ${inputName} is '${valueStr}' which is not valid. Null will be returned`);
        return null;
    }

    const value = parseInt(valueStr, 10);
    if (isNaN(value))
        throw new InvalidGitHubActionInputError(
            inputName,
            `The retrieved integer value for: ${inputName} is ${valueStr}, which is deemed to be a NaN`);
    debug(`The retrieved integer input value for: ${inputName} parsed to: '${value}'`);

    return value;
}

/**
 * Gets a string input from the GitHub Actions workflow.
 * @param inputName The name of the input to retrieve.
 */
function getStringInput(
    inputName: string): string | null {
    debug(`Going to retrieve string input for: ${inputName}`);

    const value= getInput(inputName);
    debug(`Retrieved string input for: ${inputName} with a value of '${value}'`);

    if (value === null || value === undefined || value === '') {
        debug(`The retrieved string value for: ${inputName} is '${value}' which is not valid. Null will be returned`);
        return null;
    }

    return value;
}

/**
 * Gets a comma-delimited string from the GitHub Actions workflow and returns an array.
 * @param inputName The name of the input to retrieve.
 */
function getStringArrayInput(
    inputName: string): string [] {
    const value= getStringInput(inputName);

    if(value)
        return value.split(',');

    return [];
}

/**
 * Gets a string input from the GitHub Actions workflow.
 * @param inputName The name of the input to retrieve.
 * @param allowedValues The values that are allowed for the input.
 */
function getStringInputAndValidateAgainstAllowedValues(
    inputName: string,
    allowedValues: string[]): string | null {

    const value = getStringInput(inputName);
    if (value === null || value === undefined || value === '') {
        debug(`No value provided for: ${inputName}, returning default: null`);
        return null;
    }

    for (const allowedValue of allowedValues) {
        if (value.toLowerCase().trim() === allowedValue.toLowerCase().trim()) {
            debug(`The retrieved string input value for: ${inputName} is: '${value}', which is one of the expected values ${allowedValues.join(', ')}.`);
            return value;
        }
    }

    throw new InvalidGitHubActionInputError(
        inputName,
        `The retrieved string value for: ${inputName} is ${value}, which is not one of the expected values ${allowedValues.join(', ')}.`);
}

export {
    getBooleanInput,
    getIntegerInput,
    getStringInput,
    getStringArrayInput,
    getStringInputAndValidateAgainstAllowedValues
};

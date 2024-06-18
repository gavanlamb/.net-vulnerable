import { basename, extname } from 'node:path';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    rootDir: './',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testMatch: ['**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: ['./src/**'],
    coverageReporters: ['lcovonly', 'lcov', 'html'],
    coverageDirectory: '.qodana/code-coverage/',
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: './test-results',
            outputName: 'junit.xml',
            classNameTemplate: '{classname}',
            titleTemplate: '{title}',
            suiteNameTemplate: (arg: { filepath: string }) => {
                const name = basename(arg.filepath, extname(arg.filepath));
                return basename(name, extname(name));
            }
        }]
    ]
};

export default config;

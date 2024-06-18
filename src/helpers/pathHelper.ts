import {
    basename,
    extname
} from "node:path";
import {
    debug
} from "@actions/core";

function getFileName(
    filePath: string): string {
    debug(`Going to get the file name from ${filePath}`);

    const fileNameWithExtension = basename(filePath);
    debug(`The file name with extension is ${fileNameWithExtension}`);

    const fileExtension = extname(filePath);
    debug(`The file extension is ${fileExtension}`);

    const fileName = fileNameWithExtension.replace(fileExtension, '');
    debug(`The file name is ${fileName}`);

    return fileName;
}

export {
    getFileName
};
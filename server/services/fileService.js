const fs = require('fs')
const File = require('../models/File')
const config = require('config')
const path = require('path');


class FileService {

    createDir(file) {
        const filePath = path.join(config.get('filePath'), file.user.toString(), file.path);
        console.log("Creating directory at:", filePath);

        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, {recursive: true});
                    return resolve({message: `File was created successfully.`});
                } else {
                    return reject({message: `File already exists`});
                }
            } catch (e) {
                console.error("Error creating fileList:", e);
                return reject({message: `File error: ${e.message}`});
            }
        });
    }

    deleteFile(file) {
        const path = this.getPath(file);
        console.log("Resolved file path:", path);
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        if (file.type === 'dir') {
            return path.join(config.get('filePath'), file.user.toString(), file.path);
        }

        return file.path

    }
}


module.exports = new FileService()
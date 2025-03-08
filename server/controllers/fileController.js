const fileService = require('../services/fileService')
const User = require('../models/User')
const File = require('../models/File')
const path = require('path');


class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body;
            console.log("User ID from request:", req.user?.id);

            if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });

            const file = new File({ name, type, parent, user: req.user.id });
            const parentFile = parent ? await File.findOne({ _id: parent }) : null;

            if (!parentFile) {
                file.path = name;
            } else {
                file.path = path.join(parentFile.path, file.name);
                parentFile.childs.push(file._id);
                await parentFile.save();
            }

            console.log("Final computed fileList path:", file.path);

            await fileService.createDir(file);
            await file.save();

            return res.json(file);
        } catch (e) {
            console.error("Error in createDir:", e);
            return res.status(400).json(e);
        }
    }

    async getFiles(req, res) {
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            return res.json({files})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    }
}

module.exports = new FileController()
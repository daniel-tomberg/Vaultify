const fileService = require('../services/fileService')
const User = require('../models/User')
const File = require('../models/File')
const config = require('config')
const fs = require("fs");
const path = require('path');

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body;
            console.log("User ID from request:", req.user?.id);

            if (!req.user?.id) return res.status(401).json({message: "Unauthorized"});

            const file = new File({name, type, parent, user: req.user.id});
            const parentFile = parent ? await File.findOne({_id: parent}) : null;

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
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    }

    async uploadFile(req, res) {
        try {
            console.log("Request Files:", req.files);

            if (!req.files || !req.files.file) {
                return res.status(400).json({message: "No file uploaded"});
            }

            const file = req.files.file;
            console.log("Received File:", file);

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent});
            const user = await User.findOne({_id: req.user.id});

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: "No space left on disk"});
            }

            user.usedSpace += file.size;

            const basePath = config.get('filePath');
            const sanitizedFileName = file.name || `file_${Date.now()}`;

            const parentPath = parent?.path ? String(parent.path) : "";
            const filePath = path.join(basePath, String(user._id), parentPath, sanitizedFileName);

            if (fs.existsSync(filePath)) {
                return res.status(400).json({message: "File already exists"});
            }

            console.log("Uploading file at:", filePath);
            await file.mv(filePath);

            const type = sanitizedFileName.split('.').pop();
            const dbFile = new File({
                name: sanitizedFileName,
                type,
                size: file.size,
                path: parent?.path || "",
                parent: parent?._id,
                user: user._id
            });

            await dbFile.save();
            await user.save();

            res.json(dbFile);
        } catch (e) {
            console.error("Upload error:", e);
            return res.status(500).json({message: "Upload error"});
        }
    }
}

module.exports = new FileController()
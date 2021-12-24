const aws = require('aws-sdk')
const crypto = require('crypto')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', 'tmp', 'uploads'))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err)

                file.key = `${hash.toString('hex')}-${file.originalname}`
                file.location = `${process.env.APP_URL}/files/${file.key}`

                callback(null, file.key)
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err)

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                callback(null, fileName)
            })
        }
    })
}

const config = {
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    filterFilter: (req, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'audio/mpeg',
            'audio/mp4'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(new Error('Invalid file type'))
        }
    }
}

module.exports = multer(config)

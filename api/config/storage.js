const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const s3 = new aws.S3()

const storageTypes = {
    local: {
        del: (name) => {
            return promisify(fs.unlink)(path.resolve(__dirname, '..', 'tmp', 'uploads', name))
        }
    },
    s3: {
        del: (name) => {
            return s3.deleteObject({ Bucket: process.env.AWS_S3_BUCKET_NAME, Key: name }).promise()
        }
    }
}

module.exports = storageTypes[process.env.STORAGE_TYPE]

const access_key = 'FDKsmR5tOoKNGPie5IK1'
const secret_key = 'rIsdHa0cITlo4QMfJcUP1dLQ7REwFG9u2lN3pzem'
const endpoint = 'kr.object.ncloudstorage.com'
const region = 'kr-standard'
const bucket_title = 'codetattoo'

const AWS = require('aws-sdk')

const S3 = new AWS.S3({
    endpoint : endpoint,
    region : region,
    credentials : {
        accessKeyId : access_key,
        secretAccessKey : secret_key
    }
})

exports.imageUpload = async function(body) {
    await S3.upload({
        Bucket : bucket_title,
        Key : body.title,
        ACL : 'public-read',
        Body : Buffer.from(body.image, 'base64'),
        ContentType : 'image/jpg'
    }).promise()
}

const config = require('./config/key')
const AWS = require('aws-sdk')

const endpoint = 'kr.object.ncloudstorage.com'
const region = 'kr-standard'
const bucket_title = 'codetattoo'


const S3 = new AWS.S3({
    endpoint : endpoint,
    region : region,
    credentials : {
        accessKeyId : config.naver_access_key,
        secretAccessKey : config.naver_secret_key
    }
})

exports.upload = async function(body) {
    return await S3.upload({
        Bucket : bucket_title,
        Key : body.title,
        ACL : 'public-read',
        Body : Buffer.from(body.image.data, 'base64'),
        ContentType : body.image.mime
    }).promise().then((data) => {
        return data.Location
    })
}

exports.
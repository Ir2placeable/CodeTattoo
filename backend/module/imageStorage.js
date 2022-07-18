const config = require('../config/key')
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

// params : { title, image, mime }
exports.upload = async function(params) {
    return await S3.upload({
        Bucket : bucket_title,
        Key : params.title,
        ACL : 'public-read',
        Body : Buffer.from(params.image, 'base64'),
        ContentType : params.mime
    }).promise().then((data) => {
        return data.Location
    })
}

// S3.getObject : 오브젝트 하나 리턴
// S3.getSingedUrl : 주소 리턴
// S3.listObjects : 오브젝트 리스트 리턴
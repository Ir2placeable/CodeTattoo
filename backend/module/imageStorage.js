// 코드 목적 : Naver Object Storage(이미지 DB) 에 이미지 기록 및 삭제를 수행한다.

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

// 데이터 기록 : 이미지 저장소에 Encoded Base64 를 저장하고 url를 반환한다.
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

// 데이터 삭제 : 이미지 저장소에서 이미지를 삭제한다.
exports.delete = async function(id) {
    await S3.deleteObject({
        Bucket : bucket_title,
        Key : id
    })
}

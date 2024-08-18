import aws from "aws-sdk"
import { nanoid } from "nanoid";

/**
 * @description:"Setting Up S3 Bucket"
 *  connect to the aws server
 */

const s3 = new aws.S3({
    region:'ap-south-1',
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})

export const generateUploadURL =async () => {
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

    return await s3.getSignedUrlPromise('putObject',{
        Bucket:'eurocourse-images', // blog-website-hash
        Key:imageName,
        Expires:1000,
        ContentType:"image/jpeg"
    })
}
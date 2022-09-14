package com.example.codetattoochat.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;

@Service
public class ObjectStorageService {
    @Autowired
    private MessageService messageService;

    final String endPoint = "https://kr.object.ncloudstorage.com";
    final String regionName = "kr-standard";
    final String accessKey = "FDKsmR5tOoKNGPie5IK1";
    final String secretKey = "rIsdHa0cITlo4QMfJcUP1dLQ7REwFG9u2lN3pzem";

    // S3 client
    final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
            .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
            .build();


    String bucketName = "codetattoo";
    // create folder
    String folderName = "chat/";

    String objectName = "sample-object";
    String filePath = "/tmp/sample.txt";

    public void DirUploadS3() {
        System.out.println("Called Dir Upload S3");
        // create folder
        String folderName = "sample-folder/";

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(0L);
        objectMetadata.setContentType("application/x-directory");
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, folderName, new ByteArrayInputStream(new byte[0]), objectMetadata);

        try {
            s3.putObject(putObjectRequest);
            System.out.format("Folder %s has been created.\n", folderName);
        } catch (AmazonS3Exception e) {
            e.printStackTrace();
        } catch(SdkClientException e) {
            e.printStackTrace();
        }
    }

    public String UploadS3(String key, InputStream file, String mime) {
        try {
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(mime);
            s3.putObject(bucketName, key, file, objectMetadata);
            s3.setObjectAcl(bucketName, key, CannedAccessControlList.PublicRead);
            System.out.format("Object %s has been created.\n", key);

        } catch (AmazonS3Exception e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
        return String.valueOf(s3.getUrl(bucketName, key));
    }

    public void DeleteS3(String reservation_id) {
        System.out.println("reservation_id = " + reservation_id);
        Iterable<String> urls = messageService.getUrlList(reservation_id);
        
        for (String u : urls) {
            try {
                s3.deleteObject(bucketName, u.substring(47));
                System.out.format("Object %s has been deleted.\n", u.substring(47));
            } catch (AmazonS3Exception e) {
                e.printStackTrace();
            } catch(SdkClientException e) {
                e.printStackTrace();
            }
        }
    }
}

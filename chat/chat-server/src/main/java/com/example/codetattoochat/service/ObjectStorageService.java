package com.example.codetattoochat.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;

@Service
public class ObjectStorageService {
    @Autowired
    private MessageService messageService;

    final String endPoint = "https://kr.object.ncloudstorage.com"; //Naver Cloud ObjectStorage End Point;
    final String regionName = "kr-standard"; //Naver Cloud ObjectStorage region Name;
    @Value("${cloud.objectStorage.credentials.accessKey}")
    private String accessKey; //Naver Cloud ObjectStorage access Key;
    @Value("${cloud.objectStorage.credentials.secretKey}")
    private String secretKey; //Naver Cloud ObjectStorage secret Key;

    // S3 client
    final AmazonS3 s3 = AmazonS3ClientBuilder.standard() // S3에 접근하기 위한 객체 builc
            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
            .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
            .build();

    String bucketName = "codetattoo"; // codetattoo라는 버킷네임

    // codetattoo 버킷에 이미지 파일을 올리기 위한 함수
    // ACL설정을 PublicRead로 해야한다.
    // key는 이미지 이름으로, reservation_id + "%" + TIMESTAMP로 지정
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


    // codetattoo 버킷의 이미지 파일을 삭제하기 위한 함수
    // key를 기준으로 삭제
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

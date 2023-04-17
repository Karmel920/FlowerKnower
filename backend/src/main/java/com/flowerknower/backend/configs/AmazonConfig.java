package com.flowerknower.backend.configs;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class AmazonConfig {
    private static String ACCESS_KEY;
    private static String SECRET_KEY;

    @Value("${aws.key}")
    public void setAccessKey(String accessKey) {
        AmazonConfig.ACCESS_KEY = accessKey;
    }
    @Value("${aws.secret}")
    public void setSecretKey(String secretKey) {
        AmazonConfig.SECRET_KEY = secretKey;
    }

    @Bean
    public AmazonS3 s3() {
        AWSCredentials awsCredentials =
                new BasicAWSCredentials(AmazonConfig.ACCESS_KEY, AmazonConfig.SECRET_KEY);
        return AmazonS3ClientBuilder
                .standard()
                .withRegion("eu-north-1")
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}

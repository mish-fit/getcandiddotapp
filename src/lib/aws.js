import React, { useState } from "react";
import AWS from "aws-sdk";

const S3_BUCKET = "taiq-images";
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: "AKIAUJDNJ6GZAE7PEMC4",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const UploadImageToS3WithNativeSdk = (file, name) => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: S3_BUCKET,
    Key: name + ".png",
  };

  myBucket
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      // console.log(Math.round((evt.loaded / evt.total) * 100));
    })
    .send((err) => {
      if (err) {
        // console.log(err);
      };
    });

  // const options = {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     "x-amz-acl": "public-read",
  //   },
  // };

  // axios(
  //   {
  //     method: "post",
  //     url: signedURL,
  //     data: formData,
  //     options: options,
  //   },
  //   { timeout: 5000 }
  // )
  //   .then((res) => {
  //     console.log("Image Uplaoded", res.data);
  //   })
  //   .catch((e) => console.log(e));
};

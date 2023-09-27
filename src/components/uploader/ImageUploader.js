import React, { useState } from "react";
import axios from "axios";
import { Modal, Upload } from "antd";
import { LoadingOutlined, PlusCircleFilled } from "@ant-design/icons";
import styled from "styled-components";

let cloudinary = {
  cloudName: "dwxavfgac",
  apiKey: "237159868329942",
  apiSecret: "0RXgrLDWBE8zWOdAjZrSt1bGRwE",
};

const ImageUploadWrapper = styled(Upload)`
  .ant-upload-list-picture-card-container {
    width: 70px;
    height: 70px;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 70px;
    height: 70px;
  }
`;
const ImageUploadIcon = styled(Upload)`
  .ant-upload-list-picture-card .ant-upload-list-item {
    display: none;
  }
  .ant-upload-list-picture-card-container {
    width: 20px;
    height: 20px;
  }
  .ant-upload.ant-upload-select-picture-card {
    margin-right: 0px;
    margin-bottom: 0px;

    position: absolute;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    border: 4px solid #fff;
    background-color: #999999;
    bottom: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 22px;
  }
`;

const ImageUploader = (props) => {
  const {
    fileList,
    setFileList,
    loading,
    setLoading,
    uploadPreset,
    uploadLength,
    icon,
    showUploadList,
    profileImg,
  } = props;
  //   const [fileList, setFileList] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleFileInputChange = async (event) => {
    try {
      const formData = new FormData();
      formData.append("file", event.file);
      formData.append("upload_preset", uploadPreset);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dwxavfgac/image/upload`,
        formData
      );
      if (profileImg) {
        setFileList({
          url: response.data.secure_url,
          uid: response.data.public_id,
          signature: response.data.signature,
        });
      } else {
        setFileList([
          ...fileList,
          {
            url: response.data.secure_url,
            uid: response.data.public_id,
            signature: response.data.signature,
          },
        ]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusCircleFilled />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (url) => {
      //   setLoading(false);
      //   setImageUrl(url);
      // });
      return true;
    }
  };

  const handlePreview = async (file) => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const onRemove = async (file) => {
    // const timestamp = Date.now().toString();
    // const files = fileList.find((v) => v.uid == file.uid);
    // let publicId = files.uid;
    // let signature = files.signature;

    // try {
    //   const response = await axios.delete(
    //     `https://api.cloudinary.com/v1_1/dwxavfgac/image/destroy`,
    //     {
    //       params: {
    //         public_id: publicId,
    //         api_key: cloudinary.apiKey,
    //         timestamp: timestamp,
    //         signature: signature,
    //       },
    //     }
    //   );
    //   console.log("delete reponse", response);
    // if(response){
    const files = fileList.filter((v) => v.uid !== file.uid);
    setFileList(files);
    // }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      {icon ? (
        <ImageUploadIcon
          showUploadList={{
            showDownloadIcon: false,
            showRemoveIcon: false,
            showPreviewIcon: false,
          }}
          disabled={loading}
          listType="picture-card"
          // fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          customRequest={handleFileInputChange}
          onRemove={onRemove}
        >
          {icon}
        </ImageUploadIcon>
      ) : (
        <ImageUploadWrapper
          disabled={loading}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          customRequest={handleFileInputChange}
          onRemove={onRemove}
        >
          {fileList.length >= uploadLength ? null : uploadButton}
        </ImageUploadWrapper>
      )}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};
export default ImageUploader;

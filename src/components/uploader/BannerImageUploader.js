import React, { useState } from "react";
import axios from "axios";
import { Modal, Upload } from "antd";
import { LoadingOutlined, PlusCircleFilled } from "@ant-design/icons";
import styled from "styled-components";
import { BiPlusCircle } from "react-icons/bi";

let cloudinary = {
  cloudName: "dwxavfgac",
  apiKey: "237159868329942",
  apiSecret: "0RXgrLDWBE8zWOdAjZrSt1bGRwE",
};

const ImageUploadWrapper = styled(Upload)`
  .ant-upload-list-picture-card-container {
    width: 100%;
    height: 180px;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 100%;
    height: 180px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0px !important;
    border-radius: 10px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item-thumbnail img {
    object-fit: cover !important;

    border-radius: 10px;
  }
  .ant-upload-list-item-actions button {
    display: ${(props) => (props.mode == "View Package" ? "none" : null)};
  }
`;

const BannerImageUploader = (props) => {
  const {
    fileList,
    setFileList,
    loading,
    setLoading,
    uploadPreset,
    uploadLength,
    viewDeleteIcon,
  } = props;
  //   const [fileList, setFileList] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  console.log("flate list", fileList);
  const handleFileInputChange = async (event) => {
    try {
      const formData = new FormData();
      formData.append("file", event.file);
      formData.append("upload_preset", uploadPreset);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dwxavfgac/image/upload`,
        formData
      );
      setFileList([
        {
          url: response.data.secure_url,
          uid: 1,
        },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <BiPlusCircle style={{ fontSize: 30 }} />}
      <h3
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </h3>
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
      <ImageUploadWrapper
        mode={viewDeleteIcon}
        accept="image/*"
        disabled={loading}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleFileInputChange}
        onRemove={onRemove}
        multiple={false}
      >
        {fileList.length >= uploadLength ? null : uploadButton}
      </ImageUploadWrapper>

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
export default BannerImageUploader;

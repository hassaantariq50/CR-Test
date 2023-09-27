import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Row, Col, Modal } from "antd";
import ReactPlayer from "react-player";
import Logo from "../../images/logo192.png";
import { BsYoutube } from "react-icons/bs";

const VideoCard = (props) => {
  const { title, description, url } = props;
  const [showModal, setShowModal] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    console.log("play", play);
  }, [play]);

  return (
    <StyledCard>
      <div
        onClick={() => {
          setShowModal(true);
          setPlay(true);
        }}
      >
        {/* <ReactPlayer
          light="https://fixthephoto.com/blog/UserFiles/landscape-photo-editing-sample.jpg"
          previewTabIndex={5}
          // url={url}
          width={"100%"}
          height={300}
        /> */}
        <div className="video-thumbnail" style={{ backgroundImage: `url(${Logo})` }}>
          <BsYoutube className="icon" />
        </div>
        <section className="section">
          <h1 className="title">{title}</h1>
          <div className="description">{description}</div>
        </section>
      </div>
      <StyledModal
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
          setPlay(false);
        }}
        centered
        footer={null}
        bodyStyle={{ height: 450, width: 600 }}
      >
        <ReactPlayer controls url={url} width={"100%"} height={"100%"} playing={play} />
      </StyledModal>
    </StyledCard>
  );
};

export default VideoCard;

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0px;
  }
`;

const StyledCard = styled.div`
  height: 400px;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.03), -2px -2px 3px rgba(0, 0, 0, 0.03),
    -2px 2px 3px rgba(0, 0, 0, 0.03), 2px -2px 3px rgba(0, 0, 0, 0.03);
  background-color: #fff;

  .section {
    padding: 16px 24px;
  }

  .title {
    font-weight: 600;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .video-thumbnail {
    height: 305px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease;
    .icon {
      transition: 0.3s ease;
      font-size: 80px;
      color: rgba(0, 0, 0.5);
    }
    &:hover {
      transition: 0.3s ease;
      opacity: 0.8;
      .icon {
        transition: 0.3s ease;
        color: #ff0000;
      }
    }
  }
`;

import styled from "styled-components";
import { Row, Col, Skeleton } from "antd";
import ReactPlayer from "react-player";

const VideoCardSkeleton = (props) => {
  const { title, description, url } = props;
  return (
    <StyledCard>
      <Skeleton.Image style={{ width: "100%", height: 300 }} />
      <section className="section">
        <Skeleton paragraph={{ rows: 1 }} />
      </section>
    </StyledCard>
  );
};

export default VideoCardSkeleton;

const StyledCard = styled.div`
  height: 400px;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.03), -2px -2px 3px rgba(0, 0, 0, 0.03),
    -2px 2px 3px rgba(0, 0, 0, 0.03), 2px -2px 3px rgba(0, 0, 0, 0.03);
  background-color: #fff;

  .section {
    padding: 8px 24px;
  }
`;

import { Col, Row, Skeleton } from "antd";
import React from "react";

const MessageLoading = () => {
  return (
    <>
      {[1, 2, 3].map((index) => {
        return (
          <div key={index}>
            <Row className="message-wrapper">
              <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
                <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
                  <Skeleton.Avatar active={true} size={"large"} shape={"circle"} />
                </Col>
                <Col span={23}>
                  <Skeleton.Input
                    style={{
                      minWidth: 500,
                      height: 60,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                    active={true}
                    size={"large"}
                  />
                </Col>
              </div>
            </Row>

            <Row justify="end" style={{ paddingRight: "2%" }} className="message-wrapper">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Col span={23}>
                  <Skeleton.Input
                    style={{
                      minWidth: 500,
                      height: 60,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      borderTopLeftRadius: 20,
                    }}
                    active={true}
                    size={"large"}
                  />
                </Col>
                <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
                  <Skeleton.Avatar active={true} size={"large"} shape={"circle"} />
                </Col>
              </div>
            </Row>
          </div>
        );
      })}
    </>
  );
};

export default MessageLoading;

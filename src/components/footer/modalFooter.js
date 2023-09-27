import React from "react";
import { Row, Col, Button } from "antd";

const CustomFooter = (props) => {
  return (
    <Row type="flex" justify="end" align="middle" style={props.style}>
      <Col span={7} style={{ paddingLeft: "10px" }}>
        <Button
          block
          shape="round"
          type="danger"
          size="default"
          span={24}
          onClick={props.onCancel}
        >
          {props.cancelText || "Cancel"}
        </Button>
      </Col>
      <Col span={7} style={{ paddingLeft: "10px" }}>
        <Button
          block
          shape="round"
          type="primary"
          size="default"
          span={24}
          style={{
            outline: "none",
            border: "none",
            backgroundColor: "#d1d1d1",
          }}
          htmlType="submit"
          onClick={props.onOk}
          loading={props.loading || false}
        >
          {props.okText || "Ok"}
        </Button>
      </Col>
    </Row>
  );
};

export default CustomFooter;

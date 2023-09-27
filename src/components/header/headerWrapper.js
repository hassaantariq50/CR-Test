import React from "react";
import { Row, Col } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const HeaderWrapper = (props) => {
  const { collapsed, toggleCollapsed } = props;
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.09)",
        boxShadow: "2px 2px 3px rgba(0,0,0,0.09)",
        padding: "8px 32px",
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={() => toggleCollapsed(false)}
              style={{ fontSize: 24 }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={() => toggleCollapsed(true)}
              style={{ fontSize: 24 }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HeaderWrapper;

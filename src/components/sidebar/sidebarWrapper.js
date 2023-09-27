import React, { useEffect } from "react";
import { Layout, Tooltip, Row, Col, message } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import SidebarContent from "./sidebarContent";
import { useSelector, useDispatch } from "react-redux";
// import { useMutation, Mutations, errorHandler, Queries } from "apis/config";

import { useMutation } from "@apollo/react-hooks";
import Mutations from "../../apis/mutations";
import { userClient } from "../../apis/config";

import { logoutAction } from "redux/actions";
import Logo from "images/logo192.png";
import { ReactComponent as LogoutIcon } from "images/logout.svg";
import Icon from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { errorHandler } from "helpers/errorHandler";

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  background: #012169 !important;
  min-height: 100vh;
  position: sticky;
  top: 0;

  .ant-menu-inline-collapsed {
    .ant-menu-item {
      margin-left: 7px !important;
      margin-right: 7px !important;
      width: 3px !important;
      border-radius: 6px;
      transition: 0s !important;
    }
  }

  .ant-menu-item {
    margin-left: 12px !important;
    margin-right: 12px !important;
    width: 227px !important;
    transition: 0.6s !important;
    border-radius: 6px;

    .ant-menu-item-icon {
      margin-left: -10px !important;
    }
    span a,
    span svg {
      color: #7787a0 !important;
    }
  }

  .ant-menu-item-selected {
    background-color: #032d77 !important;
    span a,
    span svg {
      color: #fff !important;
    }
  }

  .ant-layout-sider-children ul {
    background-color: transparent !important;
  }

  .sidebar-bottom {
    padding: 16px 24px;
    position: absolute;
    bottom: 0;
    width: -webkit-fill-available;
    width: -moz-available;
    background-color: #032d77;
    * {
      transition: 0.6s;
    }
  }
  .user-image {
    padding: 8px;
    color: #fff;
    border-radius: 50%;
    border: 1px solid #fff;
    cursor: pointer;
  }
`;

const SidebarWrapper = ({ collapsed, toggleCollapsed }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { deviceId } = useSelector((state) => state.user.data);

  /**
   * Logout Mutation and Handler
   */
  const [logoutUser, { loading: isLoading }] = useMutation(Mutations.LOGOUT, {
    client: userClient,
  });

  const handleLogout = async () => {
    let variables = {
      deviceId: deviceId,
    };
    try {
      await logoutUser({ variables });
    } catch (err) {
      message.error(errorHandler(err));
    } finally {
      dispatch(logoutAction());
      history.push("/");
    }
  };

  return (
    <StyledSider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={80}
      width="256px"
    >
      <div
        style={{ textAlign: "center", cursor: "pointer" }}
        onClick={() => {
          collapsed ? toggleCollapsed(false) : toggleCollapsed(true);
        }}
      >
        <img
          src={Logo}
          alt="winq_logo"
          style={{ width: collapsed ? "40px" : "35%", padding: "20px 0" }}
        />
      </div>

      <SidebarContent collapsed={collapsed} />
      <div className="sidebar-bottom">
        <Row align="middle" gutter={[0, 16]} justify={collapsed ? "center" : "center"}>
          <Col>
            <Tooltip title="Logout">
              <div
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    marginRight: 8,
                    display: collapsed ? "none" : "flex",
                  }}
                >
                  Logout
                </p>
                {isLoading ? (
                  <LoadingOutlined style={{ fontSize: 18 }} />
                ) : (
                  <Icon component={LogoutIcon} style={{ fontSize: 18 }} />
                )}
              </div>
            </Tooltip>
          </Col>
        </Row>
      </div>
    </StyledSider>
  );
};

export default SidebarWrapper;

// height: 100px;
// text-align: center;
// align-items: center;
// justify-content: center;

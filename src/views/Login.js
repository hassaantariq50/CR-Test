import React, { useState } from "react";
import { InputWrapper } from "components/input";
import BannerImage from "images/loginTopImage.svg";
import { Form, message, Row, Col } from "antd";
import { ArrowRightOutlined, LoadingOutlined, LockFilled } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "redux/actions";
import styled from "styled-components";
import { ButtonWrapper } from "components/buttons";
// import { useMutation, errorHandler, Mutations } from "apis/config";

import { useMutation } from "@apollo/react-hooks";
import Mutations from "../apis/mutations";
import { userClient } from "../apis/config";

import companyLogo from "images/logo192.png";
import moment from "moment";
import { errorHandler } from "helpers/errorHandler";

export const StyledContent = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #212121;
  * p {
    margin: 0;
  }

  .card-wrapper {
    position: relative;
    width: 456px;
    background-color: #f4f6fb;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }

  .card-banner {
    display: flex;
    align-items: end;
    justify-content: space-between;
    background-color: #e0e6f6;
    height: 136px;
    width: -webkit-fill-available;
    width: -moz-available;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .banner-icon {
    font-size: 48px;
    background-color: #fff;
    height: 72px;
    width: 72px;
    line-height: 82px;
    border-radius: 50%;
    position: absolute;
    top: 96px;
    left: 32px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.09), -2px -2px 4px rgba(0, 0, 0, 0.09),
      2px -2px 4px rgba(0, 0, 0, 0.09), -2px 2px 4px rgba(0, 0, 0, 0.09);
  }

  .form-label {
    text-align: left;
    margin-bottom: 8px;
    font-size: 16px;
  }

  .forgot-password a {
    color: #000;
  }
`;

const LoginNew = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({ email: "", password: "" });

  /**
   * Muatation and handler for Register Account
   */

  const [loginUser, { loading: isLoading }] = useMutation(Mutations.SIGN_IN, {
    client: userClient,
  });

  const handleLogin = async () => {
    const deviceId = Math.floor(100000 + Math.random() * 900000).toString();
    let variables = {
      email: state.email,
      password: state.password,
      deviceId: deviceId,
    };
    try {
      const { data } = await loginUser({ variables });
      console.log("Data: ", data);
      dispatch(loginAction({ ...data.loginUser, deviceId }));
      history.push("/dashboard");
    } catch (err) {
      message.error(errorHandler(err));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <StyledContent>
      <div className="card-wrapper">
        <div className="card-banner">
          <div style={{ alignSelf: "flex-start", margin: "24px 0 0 32px" }}>
            <div className="banner-wrapper">
              <div style={{ fontWeight: 600, fontSize: 18 }}>Welcome Back</div>
              <p style={{ color: "#012169", fontWeight: 500 }}>Sign in to continue</p>
            </div>
          </div>
          <div>
            <img src={BannerImage} alt="Logo" width={240} />
          </div>
        </div>

        <div>
          <img alt="app icon" src={companyLogo} className="banner-icon" />
        </div>

        <div style={{ margin: "48px 32px 32px 32px" }}>
          <Form onFinish={handleLogin} validateTrigger="onFinish">
            <h4 className="form-label">Email</h4>
            <Form.Item name="Email" rules={[{ type: "email", required: true }]}>
              <InputWrapper
                name="email"
                value={state.email}
                placeholder="abc@xyz.com"
                onChange={handleChange}
              />
            </Form.Item>

            <h4 className="form-label">Password</h4>
            <Form.Item
              name="Password"
              rules={[{ type: "string", required: true, min: 3 }]}
            >
              <InputWrapper.Password
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Item>

            <ButtonWrapper
              style={{ marginTop: 24, height: 40 }}
              size="large"
              htmlType="submit"
              disabled={isLoading}
            >
              Continue
              {!isLoading ? (
                <ArrowRightOutlined style={{ marginLeft: 8 }} />
              ) : (
                <LoadingOutlined style={{ marginLeft: 8 }} />
              )}
            </ButtonWrapper>
          </Form>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            Don't have an account.{" "}
            <Link to="/register" style={{ color: "#000", fontWeight: 600 }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </StyledContent>
  );
};

export default LoginNew;

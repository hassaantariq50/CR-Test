import React, { useState, useEffect } from "react";
import { InputWrapper } from "../components/input";
import { message, Form, Row, Col } from "antd";
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../apis/mutations";
import { userClient } from "../apis/config";

import { ButtonWrapper } from "components/buttons";
import BannerImage from "images/loginTopImage.svg";
import companyLogo from "images/logo192.png";
import styled from "styled-components";
import moment from "moment";
import { errorHandler } from "helpers/errorHandler";

const initialState = {
  fullName: "",
  phoneError: "",
  email: "",
  password: "",
};

const RegisterAccount = () => {
  const [state, setState] = useState({ ...initialState });
  const [form] = Form.useForm();
  const history = useHistory();

  /**
   * Muatation and handler for Register Account
   */

  const [signupUser, { loading: isLoading }] = useMutation(Mutations.SIGN_UP, {
    client: userClient,
  });

  const handleRegisterAccount = async () => {
    let variables = {
      fullName: state.fullName,
      email: state.email,
      password: state.password,
    };

    try {
      const { data } = await signupUser({ variables });
      if (data.signupUser._id) {
        message.success("Registeration successfull. Please login to continue");
        form.resetFields();
        setState({ ...initialState });
        history.push("/");
      }
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
          <div style={{ alignSelf: "flex-start", margin: "24px 0 0 24px" }}>
            <div className="banner-wrapper">
              <div style={{ fontWeight: 600, fontSize: 18 }}>Welcome</div>
              <p style={{ color: "#012169", fontWeight: 500 }}>
                Please fill the required fields
              </p>
            </div>
          </div>
          <div>
            <img src={BannerImage} alt="Logo" width={240} />
          </div>
        </div>

        <div>
          <img alt="app icon" src={companyLogo} className="banner-icon" />
        </div>

        <div style={{ padding: "48px 32px 32px 32px" }}>
          <Form form={form} onFinish={handleRegisterAccount} validateTrigger="onFinish">
            <Row gutter={[24, 0]}>
              <Col span={24}>
                <h4 className="form-label">Full Name</h4>
                <Form.Item name="Full Name" rules={[{ required: true }]}>
                  <InputWrapper
                    name="fullName"
                    value={state.fullName}
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <h4 className="form-label">Email</h4>
                <Form.Item name="Email" rules={[{ type: "email", required: true }]}>
                  <InputWrapper
                    name="email"
                    value={state.email}
                    placeholder="abc@xyz.com"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <h4 className="form-label">Password</h4>
                <Form.Item
                  name="Password"
                  rules={[{ type: "string", min: 3, required: true }]}
                >
                  <InputWrapper.Password
                    name="password"
                    value={state.password}
                    placeholder="Password"
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <ButtonWrapper
                  style={{ marginTop: 46, height: 40 }}
                  disabled={isLoading}
                  htmlType="submit"
                  // onClick={() => {
                  //   if (!isValidPhoneNumber(state.phoneNo)) {
                  //     setState({
                  //       ...state,
                  //       phoneError: "Invalid phone number",
                  //     });
                  //   }
                  // }}
                >
                  Register
                  {!isLoading ? (
                    <ArrowRightOutlined style={{ marginLeft: 8 }} />
                  ) : (
                    <LoadingOutlined style={{ marginLeft: 8 }} />
                  )}
                </ButtonWrapper>
              </Col>
            </Row>
          </Form>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            Already have an account.{" "}
            <Link to="/" style={{ color: "#000", fontWeight: 600 }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </StyledContent>
  );
};

export default RegisterAccount;

export const StyledContent = styled.div`
  // background: linear-gradient(90deg, #568eff 50%, #4f56c0 100%);
  background-color: #212121;
  padding: 24px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * p {
    margin: 0;
  }

  .card-wrapper {
    position: relative;
    width: 500px;
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

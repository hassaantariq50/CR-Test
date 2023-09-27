import React from "react";
import { Row, Col, Button } from "antd";
import OTPInput, { ResendOTP } from "otp-input-react";
import styled from "styled-components";

const StyledContent = styled(Row)`
  input {
    outline: none;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid black;
    background-color: #f4f6fb;
  }
`;

const time_convert = (num) => {
  const hours = Math.floor(num / 60);
  const minutes = `${num % 60}`;
  if (minutes.length === 1) {
    return `0${hours}:0${minutes}`;
  } else {
    return `0${hours}:${minutes}`;
  }
};

const OTPInputWrapper = (props) => {
  const { value, name, onChange, OTPLength, onResend, loading } = props;

  const handleChange = (value) => {
    onChange({ target: { name, value } });
  };
  return (
    <StyledContent gutter={[12, 12]}>
      <Col span={18}>
        <OTPInput
          value={value}
          onChange={handleChange}
          OTPLength={OTPLength}
          otpType="number"
        />
      </Col>

      <Col span={6}>
        <ResendOTP
          maxTime={60}
          renderButton={({ remainingTime, onClick }) => (
            <Button
              loading={loading}
              style={{ width: "100%" }}
              onClick={onClick}
              disabled={remainingTime}
            >
              {remainingTime ? time_convert(remainingTime) : "Resend"}
            </Button>
          )}
          renderTime={() => React.Fragment}
          onResendClick={onResend}
        />
      </Col>
    </StyledContent>
  );
};

export default OTPInputWrapper;

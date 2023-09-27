import React from "react";
import { Radio } from "antd";
import styled from "styled-components";

const StyledRadioGroup = styled(Radio.Group)`
  .ant-radio-inner {
    border: 1px solid #d1d1d1 !important;
  }

  .ant-radio-checked .ant-radio-inner::after {
    background-color: #d1d1d1;
  }
`;

export const RadioGroup = (props) => {
  return <StyledRadioGroup {...props}></StyledRadioGroup>;
};

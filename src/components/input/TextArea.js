import React from "react";
import styled from "styled-components";
import { Input } from "antd";

const { TextArea } = Input;
const StyledInput = styled(TextArea)`
  border: 1px solid #d1d1d1 !important;
  padding: 10px;
  // color: #d1d1d1;
  box-shadow: #d1d1d1;
  border-radius: 6px;
  height: 90px;
  resize: none;
`;

const TextAreaWrapper = (props) => {
  return <StyledInput {...props}></StyledInput>;
};

export default TextAreaWrapper;

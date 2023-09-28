import styled from "styled-components";
import { Input } from "antd";
import TextAreaWrapper from "./TextArea";
import SelectWrapper from "./selectWrapper";

const InputWrapper = styled(Input)`
  outline: none;
  height: 40px !important;
  // border 1px solid #012169 !important;
  border-radius: 4px;
  width: -webkit-fill-available;
  width: -moz-available;
  font-weight: 500;
  transition: 0.3s ease;

  ::placeholder {
    color: #d0d0d0;
    font-weight: 500;
    user-select: none;
  }
  input {
    border-radius: 4px;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    ::placeholder {
      color: #d0d0d0;
      font-weight: 500;
      user-select: none;
    }
    &:focus {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }
  &:hover,
  &:focus,
  &:active {
    transition: 0.3s ease;
    border: 1px solid #d0d0d0;
    box-shadow: none !important;
  }
`;

export { InputWrapper, SelectWrapper, TextAreaWrapper };

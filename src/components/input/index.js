import styled from "styled-components";
import { Input, Button } from "antd";
import TextAreaWrapper from "./TextArea";
import SelectWrapper from "./selectWrapper";
import SwitchWrapper from "./switchWrapper";
import PhoneInputWrapper from "./phoneInputWrapper";
import { RadioGroup } from "./radio";

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

export const PaymentButton = styled(Button)`
  border-radius: 4px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#0025ff"};
  border: none;
  color: #fff;
  height: 42px;
  font-size: 14px;
  user-select: none;
  transition: all 0.5s;
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : "200px")};
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  float: ${(props) => (props.float ? props.float : "left")};
  position: relative;

  // &:after {
  //   display: ${(props) => (props.display ? props.display : "")};
  //   content: "→";
  //   position: absolute;
  //   opacity: 0;
  //   top: 3px;
  //   font-size: 24px;
  //   right: 0px;
  //   transition: 0.5s;
  // }

  &:hover {
    opacity: 0.8;
    color: #fff;
    background-color: ${(props) => (props.hoverColor ? props.hoverColor : "#0025ff")};
    // padding-right: ${(props) => (props.paddingRight ? props.paddingRight : "40px")};
    // padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : "15px")};
  }
  &:focus {
    color: #fff;
    background-color: ${(props) => (props.focusColor ? props.focusColor : "#0025ff")};
  }

  // &:hover:after {
  //   opacity: 1;
  //   right: 20px;
  // }
`;

export {
  InputWrapper,
  PhoneInputWrapper,
  RadioGroup,
  SelectWrapper,
  SwitchWrapper,
  TextAreaWrapper,
};

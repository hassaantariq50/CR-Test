import styled from "styled-components";
import { Button } from "antd";

export const TableButton = styled(Button)`
  border: 1px solid #4f56c0;
  outline: none;
  color: #4f56c0;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  transition: 0.5s;
  &:hover,
  &:focus {
    color: #fff !important;
    background-color: #4f56c0;
  }
`;

export const ButtonWrapper = styled(Button)`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border: none !important;
  padding: 16px 32px;
  outline: none;
  border-radius: 50px;
  background-color: #ffbe04;
  // background-image: linear-gradient(to right, #4f56c0, #568eff);
  color: #000 !important;
  transition: background-color 1000ms linear;

  &:hover,
  &:focus {
    background-color: #ffbe04;
    // background-image: linear-gradient(to left, #568eff, #4f56c0);
    color: #000 !important;
  }

  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover,
  &.ant-btn[disabled]:focus,
  &.ant-btn[disabled]:active {
    background-color: #ffbe04;
    // background-image: linear-gradient(to left, #568eff, #4f56c0);
    color: #fff;
    opacity: 0.5;
  }
`;

export const TableSwitchButton = styled.button`
  padding: 0 16px;
  height: 32px;
  width: 100%;
  line-height: 1;
  border: 1px solid #9694ac;
  color: #9694ac;
  background-color: transparent;
  cursor: pointer;
  &:focus,
  &:hover {
    color: #1d194d;
  }
`;

export const AddButton = styled(Button)`
  border: none;
  border-radius: 50px;
  height: 40px;
  width: 120px;
  font-size: 16px;
  color: #fff;
  outline: none;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#012169"};
  cursor: pointer;
  transition: 0.5s;
  &:hover,
  &:focus {
    color: #fff !important;
    background-color: ${({ hoverColor }) => (hoverColor ? hoverColor : "#032D77")};
  }

  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover,
  &.ant-btn[disabled]:focus,
  &.ant-btn[disabled]:active {
    background: #012169;
    color: #fff;
    opacity: 0.5;
  }
`;

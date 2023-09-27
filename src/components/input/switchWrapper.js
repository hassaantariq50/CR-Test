import React from "react";
import styled from "styled-components";
import { Switch } from "antd";

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: #012169 !important;
  }
  // &.ant-switch {
  //     background-color: yellow;
  // }
  //   color: #d1d1d1;
  //   font-weight: bold;
  //   box-shadow: 0 0 0 2px rgba(0, 0, 0, 1);
`;

const SwitchWrapper = (props) => {
  return <StyledSwitch {...props}></StyledSwitch>;
};

export default SwitchWrapper;

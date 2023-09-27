import React from "react";
import { DatePicker } from "antd";
import styled from "styled-components";

const { RangePicker } = DatePicker;

// const StyledPicker = styled(RangePicker).attrs(() => ({ size: "large" }))`
// //   color: palevioletred;
// //   font-weight: bold;
// //   box-shadow: 0 0 0 2px rgba(0, 0, 0, 1);
// input {
//     //background-color: ${props => props.theme[props.theme.mode].background.primary};
//     color: ${props => props.theme[props.theme.mode].textColor.primary};
//     //border: 1px solid ${props => props.theme[props.theme.mode].primary.main};
//     //${props => props.appStyles ? props.appStyles : null};
//     // padding-top: 18px;
//     // padding-bottom: 18px;
// }

// .ant-calendar-picker-input {
//   background-color: ${props => props.theme[props.theme.mode].background.primary};
//   border: 1px solid ${props => props.theme[props.theme.mode].primary.main};
// }

// * {
//     color: ${props => props.theme[props.theme.mode].primary.main};
// }
// `;

const StyledPicker = styled(RangePicker)`
  width: 100% !important;
  padding: 10px 16px;
  border: 1px solid #012169;
  border-radius: 5px;

  &:hover {
    border: 1px solid #012169;
  }

  .ant-picker-input {
    color: #012169;
    :nth-child(3) input {
      text-align: right;
    }
  }

  .ant-picker-separator {
    color: #012169;
  }
`;

const RangePickerWrapper = (props) => {
  return <StyledPicker {...props} />;
};
export default RangePickerWrapper;

// cb funtion recieverd from props to get the selected date
// function onChange(date, dateString) {
//   console.log(date, dateString);
// }

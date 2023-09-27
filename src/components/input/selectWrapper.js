import React, { useEffect, useState } from "react";
import { Select } from "antd";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  display: block;
  min-width: 150px;
  text-align: left;

  .ant-select,
  .ant-select-selector {
    outline: none !important;
    border: ${(props) =>
      props.bordered === false ? "none" : "1px solid #d9d9d9"} !important;
    box-shadow: ${(props) =>
      props.bordered === false
        ? "none"
        : "2px 2px 4px rgba(0, 0, 0, 0.01), -2px -2px 4px rgba(0, 0, 0, 0.02), 2px -2px 4px rgba(0, 0, 0, 0.03), -2px 2px 4px rgba(0, 0, 0, 0.04)"} !important;
    font-size: 14px !important;
    font-weight: 500;
    ::placeholder {
      color: #d0d0d0;
      font-weight: 500;
      user-select: none;
    }
    &:hover,
    &:focus,
    &:active {
      transition: 0.3s ease;
      border: ${(props) =>
        props.bordered === false ? "none" : "1px solid #d9d9d9"} !important;
    }
  }
`;

const { Option } = Select;

const SelectWrapper = (props) => {
  const { placeholder, onChange, type, disabled } = props;
  const [options, setOptions] = useState(props.options);

  const handleSearch = (val) => {
    const filteredOptions = props.options.filter((option) => {
      return option.value.toLowerCase().includes(val.toLowerCase());
    });
    setOptions(filteredOptions);
  };

  const countrySearch = (val) => {
    const filteredOptions = props.options.filter((option) => {
      return option[`${type.label}`].toLowerCase().includes(val.toLowerCase());
    });
    setOptions(filteredOptions);
  };

  useEffect(() => setOptions(props.options), [props.options]);

  return (
    <StyledSelect
      onChange={onChange}
      showSearch={props.showSearch}
      disabled={disabled ? disabled : false}
      onSearch={(e) => {
        if (type.custom) {
          countrySearch(e);
        } else {
          handleSearch(e);
        }
      }}
      placeholder={placeholder}
      size={props.size}
      filterOption={false}
      value={props.value === "" ? null : props.value}
      defaultValue={props.defaultValue}
      loading={props.loading}
      className={props.className}
      style={props.style}
      bordered={props.bordered}
    >
      {type.custom
        ? options.map((option, index) => (
            <Option key={index} value={option[`${type?.value}`]}>
              {option[`${type?.label}`]}
            </Option>
          ))
        : options.map((option, index) => (
            <Option key={index} value={option?.value}>
              {option?.label}
            </Option>
          ))}
    </StyledSelect>
  );
};

SelectWrapper.defaultProps = {
  placeholder: "Select",
  options: [],
  onChange: () => {},
  type: {},
  autoComplete: "new-password",
  showSearch: false,
  size: "large",
};

export default SelectWrapper;

import React from "react";
import { Row, Col, Tooltip } from "antd";
import styled from "styled-components";
import SelectWrapper from "../input/selectWrapper";
import { InputWrapper } from "../input";
import { SearchOutlined } from "@ant-design/icons";
import RangePickerWrapper from "components/input/rangePicker";
import { IoIosAddCircleOutline } from "react-icons/io";

const StyledContent = styled.section`
  .heading-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .heading {
    font-size: 32px;
    color: #568eff;
    font-weight: 600;
    margin: 0 0 8px 0;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #d1d1d1;
    margin: 0 12px;
  }
`;
const ContentHeader = (props) => {
  const { title, count, onSearch, showRangeSelect, onSelectChange, showSearch, onAdd } =
    props;

  return (
    <StyledContent>
      <Row justify="space-between">
        <Col>
          <div className="heading-wrapper">
            <h1 className="heading">{title}</h1>
            {count ? (
              <>
                <div className="dot" />
                <h1 className="heading">{count}</h1>
              </>
            ) : null}
          </div>
        </Col>

        <Col
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {showSearch ? (
              <InputWrapper
                style={{ width: 300 }}
                prefix={<SearchOutlined />}
                placeholder="Search by Project Title or Tech Stack"
                onChange={onSearch}
              />
            ) : null}

            <div style={{ width: 32 }} />
            {showRangeSelect ? (
              <RangePickerWrapper style={{ height: 40, borderColor: "#d1d1d1" }} />
            ) : null}
            <div style={{ width: 32 }} />

            {onSelectChange ? (
              <SelectWrapper
                size="large"
                defaultValue="View All"
                options={[
                  { label: "View All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                onChange={onSelectChange}
              />
            ) : null}
          </div>

          {onAdd ? (
            <div style={{ width: 50 }}>
              <Tooltip title={props.tooltip ? props.tooltip : "Add new"}>
                <IoIosAddCircleOutline
                  onClick={onAdd}
                  style={{
                    cursor: "pointer",
                    color: "#135bed",
                    fontSize: 48,
                    height: "auto",
                    marginLeft: 12,
                  }}
                />
              </Tooltip>
            </div>
          ) : null}
        </Col>
      </Row>
    </StyledContent>
  );
};

ContentHeader.defaultProps = {
  title: "",
  count: null,
  onSearch: () => {},
  onFilter: () => {},
  showRangeSelect: false,
  onSelectChange: false,
  onAdd: false,
  showSearch: false,
};

export default ContentHeader;

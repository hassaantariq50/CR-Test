import React, { useState, useRef, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import styled from "styled-components";
import Style from "./Style";
import { SelectWrapper } from "components/input";
import { AddButton } from "components/buttons";
import { Row, Col } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";

const StyledTable = styled(ReactTable)`
  ${Style}
`;

const TableWrapper = (props) => {
  const {
    tableData,
    totalCount, // Total count is used when server side data fetching is used
    manual, // Total count is used when server side data fetching is used
    columns,
    fetchData,
    onExport,
    onExportLoading,
  } = props;

  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(5); // To calculate total number of pages using total count
  const reactTableRef = useRef();

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [totalCount]);

  return (
    <>
      <StyledTable
        ref={reactTableRef}
        data={tableData}
        columns={columns}
        manual={manual}
        minRows={5}
        noDataText="No data found"
        resizable={false}
        showPageSizeOptions={false}
        previousText={"‹"}
        nextText={"›"}
        onFetchData={({ page, pageSize }) => {
          fetchData({ limit: pageSize, page });
          setTotalPages(Math.ceil(totalCount / pageSize));
        }}
        pages={totalPages}
        // defaultPageSize={10}
        pageSize={pageSize}
        onPageSizeChange={(ps) => {
          setPageSize(ps);
        }}
        {...props}
      />

      <div style={{ margin: "24px 0 0 0" }}>
        <Row justify="space-between" align="bottom">
          <Col>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: 12 }}>Show entries </span>
              <SelectWrapper
                className="select-wrap -pageSizeOptions"
                options={[
                  // { label: "5", value: 5 },
                  { label: "10", value: 10 },
                  { label: "20", value: 20 },
                  { label: "50", value: 50 },
                  { label: "100", value: 100 },
                ]}
                value={pageSize}
                onChange={(val) => {
                  reactTableRef.current.onPageSizeChange(val);
                }}
                style={{ minWidth: 64 }}
              />
            </div>
          </Col>

          {onExport ? (
            <Col>
              <AddButton onClick={onExport} disabled={onExportLoading}>
                {onExportLoading ? (
                  <LoadingOutlined style={{ marginRight: 6, color: "#fff" }} />
                ) : (
                  <DownloadOutlined style={{ marginRight: 6, color: "#fff" }} />
                )}{" "}
                Export
              </AddButton>
            </Col>
          ) : null}
        </Row>
      </div>
    </>
  );
};

TableWrapper.defaultProps = {
  onExport: false,
  manual: false,
  fetchData: () => {},
};

export default TableWrapper;

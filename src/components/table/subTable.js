import React from "react";
import ReactTable from "react-table";
import styled from "styled-components";

const StyledTable = styled(ReactTable)`
  background: #f8f8f8;
  width: 100%;
  height: 100%;
  padding: 0 1%;
  margin: auto;
  border: none;

  .rt-thead {
    padding: 8px 0 0 0;
    background-color: #f8f8f8;
    color: #b5b5b5;
    font-size: 13px;
    font-weight: 700;
    box-shadow: none !important;
  }

  .rt-th {
    border: none !important;
  }

  .rt-tbody {
    overflow: hidden;
  }

  .rt-tr-group {
    margin: 0;
    padding: 0;
    border-radius: 0 !important;
    border: none !important;
    box-shadow: none !important;
    height: 28px;
    font-size: 13px;
  }

  .rt-td {
    border: none !important;
  }

  .rt-td:first-child {
    margin-left: 16px !important;
  }

  .pagination-bottom {
    display: ${(props) => (props.showPagination ? "block" : "none")};
  }
`;

const SubTableWrapper = (props) => {
  return (
    <StyledTable
      data={props.tableData}
      columns={props.columns}
      minRows={1}
      noDataText="No data found"
      resizable={false}
      //   defaultPageSize={2}
      // pageText={""}
      // previousText={"Peechy aa"}
      // nextText={"Aagy nikl"}
      showPageSizeOptions={false}
      {...props}
    />
  );
};

export default SubTableWrapper;

import { css } from "styled-components";

const style = css`
  //Should make global variables in theme for row height, box-shadows, borders and others, also have to take into account sorting through simple props
  & {
    margin-top: 25px;
    width: 100%;
    overflow: auto;
    border: none !important;
    border-radius: 5px;
    //box-shadow: 0 2px 32px -10px rgba(0,0,0,0.15) !important;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15) !important;
  }

  .rt-table {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }

  //min-width will depend on number of columns and their widths
  .rt-thead {
    min-width: 500px !important;
    position: relative;
    /* z-index: 100; */
    box-shadow: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    height: 80px;
  }

  .rt-th {
    font-size: 15px;
    font-weight: 600;
    word-break: initial !important;
    margin: auto;
  }

  .rt-th:first-child,
  .rt-td:first-child {
    margin-left: 16px !important;
  }

  //Row height must be read from theme
  .rt-tr {
    background-color: white;
    height: 65px;
  }

  .rt-th,
  .rt-td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: auto !important;
    // max-width: 120px !important;
    white-space: normal !important;
    word-break: break-all;
    padding: 15px !important;
    border: none !important;
    color: #1d194d;
  }

  .rt-td {
    font-size: 12px;
    font-weight: 500;
  }

  //The following should be app-specific as well

  .rt-tbody {
    font-weight: 600;
    background-color: rgb(249, 249, 249, 1);
  }

  // .rt-tr-group {
  //     border: none !important;
  //     margin-bottom: 5px;
  // }

  .rt-tr-group:last-child {
    margin-bottom: 0px;
  }

  // .-loading.-active {
  //background: rgba(240,255,255,0.1);
  // }

  .pagination-bottom {
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  .-pageJump input {
    border: 1px solid #012169 !important;
  }
  .-pagination {
    height: 65px !important;
    justify-content: center !important;
    align-items: center !important;
    border: none !important;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    box-shadow: none !important;
    background-color: #fff;
  }

  .-previous,
  .-center,
  .-next {
    flex: unset !important;
  }

  .-previous button,
  .-next button {
    font-size: 1.1rem !important;
    text-align: center !important;
    color: white !important;
    padding: 10px 20px !important;
    border-radius: 50% !important;
    background-color: #012169 !important;
  }

  .-center input {
    height: 40px !important;
    width: 60px !important;
    padding: 0 !important;

    border-radius: 30px !important;
  }

  .-center input[type="number"] {
    -moz-appearance: textfield;
  }

  .-center input::-webkit-outer-spin-button,
  .-center input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  // .rt-expandable {
  //   position: relative;
  //   right: 16px;
  // }
`;

export default style;

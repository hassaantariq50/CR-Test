import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";
import ChartContainer from "./chartContainer";
import moment from "moment";

const ColumnPlot = (props) => {
  const { heading, data, xField, yField, color } = props;

  const config = {
    data,
    color,
    xField,
    yField,
    height: 300,
    legend: false,
    maxColumnWidth: 14,
    // seriesField:"month",
    columnStyle: {
      radius: [20, 20, 20, 20],
    },
    columnBackground: {
      style: {
        fill: "#f3f3f3",
        radius: [20, 20, 20, 20],
      },
    },
  };

  return (
    <ChartContainer>
      <h2 style={{ marginBottom: 32, fontSize: 18 }}>{heading}</h2>
      <Column
        {...config}
        meta={{ month: { formatter: (val) => moment(val).format("DD-MMM-YYYY") } }}
      />
    </ChartContainer>
  );
};

ColumnPlot.defaultProps = {
  data: [],
  xField: "",
  yField: "",
};

export default ColumnPlot;

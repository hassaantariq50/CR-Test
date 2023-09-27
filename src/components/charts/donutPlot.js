import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
import ChartContainer from "./chartContainer";

const data = [
  {
    type: "Generated invoices",
    value: 65,
  },
  {
    type: "Paid invoices",
    value: 35,
  },
];

const DonutPlot = (props) => {
  const { heading } = props;
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    color: ({ type }) => {
      if (type === "Generated invoices") {
        return "#28C76F";
      }
      return "#D4F4E2";
    },
    radius: 1,
    innerRadius: 0.65,
    label: {
      type: "inner",
      offset: "-50%",
      content: "",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "65% ",
      },
    },
    legend: {
      layout: "horizontal",
      position: "bottom",
    },
  };

  return (
    <ChartContainer>
      <h2 style={{ marginBottom: 32, fontSize: 18 }}>{heading}</h2>
      <Pie {...config} />
    </ChartContainer>
  );
};

export default DonutPlot;

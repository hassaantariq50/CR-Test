import { useEffect, useState } from "react";
import { Area } from "@ant-design/plots";
import ChartContainer from "./chartContainer";

const AreaPlot = (props) => {
  const { heading } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data: props.dataSheet,
    xField: "month",
    yField: "value",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => ({
      fill: "#E0F9FC",
      fillOpacity: 1,
    }),
    smooth: true,
    line: {
      style: {
        lineWidth: 4,
      },
    },
    color: props.color,
  };
  return (
    <ChartContainer>
      <h2 style={{ marginBottom: 32, fontSize: 18 }}>{heading}</h2>
      <Area {...config} height={300} meta={props.meta} />
    </ChartContainer>
  );
};

export default AreaPlot;

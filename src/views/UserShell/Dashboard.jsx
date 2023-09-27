import React, { useEffect, useState } from "react";
import ContentHeader from "components/header/contentHeader";
import { Skeleton } from "antd";
import styledComponents from "styled-components";
import { useHistory } from "react-router-dom";

const StyledDiv = styledComponents.div`
.white-background{
  background-color: #fff;
  padding: 60px;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 15%) !important;
  min-height: 60vh;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cards{
  height: 400px;
  width: 400px;
  background-color: #568eff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  font-size: 32px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
  :hover{
    opacity: 0.8;
    transition: 0.2s ease;
  }
}
`;

const Dashboard = () => {
  const history = useHistory();
  return (
    <StyledDiv>
      <ContentHeader title="Dashboard" />

      <div className="white-background">
        <div
          onClick={() => {
            history.push("/dashboard/projects/all");
          }}
          className="cards"
        >
          All Projects
        </div>
        <div
          onClick={() => {
            history.push("/dashboard/projects/archived");
          }}
          className="cards"
        >
          Archived Projects
        </div>
        <div
          onClick={() => {
            history.push("/dashboard/projects/completed");
          }}
          className="cards"
        >
          Completed Projects
        </div>
      </div>
    </StyledDiv>
  );
};

export default Dashboard;

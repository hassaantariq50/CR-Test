import { Row, Col, message, Skeleton } from "antd";
import styled from "styled-components";
import { VscOrganization } from "react-icons/vsc";
import { BsCalendarDate, BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineAssessment } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { ReactComponent as DollarIcon } from "images/dollar.svg";
import { ReactComponent as InvoiceIcon } from "images/invoice.svg";
import { ReactComponent as SheetIcon } from "images/sheet.svg";
import { ReactComponent as UsersIcon } from "images/users.svg";
import Icon from "@ant-design/icons";
import { useMutation, errorHandler, Queries } from "apis/config";
import { useEffect, useState } from "react";

const keys = [
  {
    label: "Total License",
    key: "totalLicense",
    icon: BsCreditCard2Front,
    background: "rgb(254, 234, 234)",
    color: "rgb(248, 99, 104)",
  },
  {
    label: "Remaining License",
    key: "remainingLicense",
    icon: BsCreditCard2Front,
    background: "rgb(249 236 206)",
    color: "rgb(234 151 0)",
  },
  {
    label: "Registered Users",
    key: "registeredUsers",
    icon: FiUsers,
    background: "rgb(222, 231, 245)",
    color: "rgb(0, 40, 102)",
  },
  {
    label: "Total Instructors",
    key: "totalInstructors",
    icon: VscOrganization,
    background: "rgb(227, 248, 238)",
    color: "rgb(0, 197, 118)",
  },
  {
    label: "Trainings Completed",
    key: "trainingCompletedOfUser",
    icon: BsCalendarDate,
    background: "rgb(220, 249, 252)",
    color: "rgb(0, 218, 234)",
  },
  {
    label: "Completed Sessions",
    key: "sessionsCompleted",
    icon: MdOutlineAssessment,
    background: "rgb(211 206 249)",
    color: "rgb(112 0 234)",
  },
];

const DashboardCard = (props) => {
  const [stats, setStats] = useState({});
  const { mutateAsync, isLoading } = useMutation(Queries.getCompanyDashboardStats);

  useEffect(() => {
    mutateAsync()
      .then(({ data }) => {
        setStats(data.data);
      })
      .catch((err) => message.error(errorHandler(err)));
  }, []);

  return (
    <StyledCard>
      <Row gutter={[24, 24]} align="middle">
        {keys.map((item, index) => (
          <Col key={index} span={8}>
            <div className="stats-card">
              <Row align="middle">
                {isLoading ? (
                  <>
                    <Skeleton avatar paragraph={{ rows: 0 }} />
                  </>
                ) : (
                  <>
                    <Col>
                      <Icon
                        component={item.icon}
                        className="card-image"
                        style={{ backgroundColor: item.background, color: item.color }}
                      />
                    </Col>
                    <Col>
                      <h1 style={{ marginBottom: 0, fontSize: 16 }}>{item.label}</h1>
                      <div>
                        <b style={{ fontSize: 20 }}>{stats[item.key]}</b>
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    </StyledCard>
  );
};

export default DashboardCard;

const StyledCard = styled.div`
  .stats-card {
    background-color: #fff;
    padding: 32px;
    border-radius: 12px;
    box-shadow: 1px 1px solid red;
  }

  .statsics {
    background-color: #d4f4e2;
    color: #28c76f;
    margin-right: 8px;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .card-image {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 50%;
    background-color: #d4f4e2;
    margin-right: 12px;
  }
`;

{
  /* <div className="stats-card">
<Row>
  {keys.map((item, index) => (
    <Col key={index} span={24}>
      <Row align="middle">
        <Col span={17}>
          <div style={{ fontWeight: "500", fontSize: 18 }}>{item.label}:</div>
        </Col>
        <Col>
          <div>{stats[item.key]}</div>
        </Col>
      </Row>
      <Divider style={{ margin: "6px 0" }} />
    </Col>
  ))}
</Row>
</div> */
}

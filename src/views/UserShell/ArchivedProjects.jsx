import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableWrapper from "components/table/reactTable";
import ContentHeader from "components/header/contentHeader";
import styled from "styled-components";
import { useQuery } from "react-apollo";
import Queries from "apis/queries";
import { message } from "antd";
import moment from "moment";
import ProjectModal from "components/modals/projectModal";
import { ALL_PROJECTS } from "redux/constants";
import { AiOutlineEye } from "react-icons/ai";

const StyledTable = styled.div`
  .action-btn {
    height: 30px;
    width: 30px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 4px;
    margin-right: 4px;

    &:hover {
      background-color: #ececec;
    }
  }
`;

const ArchivedProjects = () => {
  const dispatch = useDispatch();
  const { allProjects } = useSelector((state) => state.allProjects);

  const projectsRef = useRef();
  const mode = useRef("view");

  const [projectModal, setProjectModal] = useState(false);
  const [allPendingProjects, setPendingProjects] = useState([]);

  const {
    data,
    loading: isLoading,
    error,
  } = useQuery(Queries.GET_ALL_PROJECTS, {
    variables: {
      status: 2,
    },
    onError: () => {
      message.error(error.message);
    },
    onCompleted: () => {
      dispatch({ type: ALL_PROJECTS.STORE, payload: data.getAllProjects });
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    console.log("all project", allProjects);
    let filteredData = allProjects.filter((x) => x.status == 2);
    setPendingProjects(filteredData);
  }, [allProjects, projectModal]);

  const handleSearch = (val) => {
    if (val.target.value == "") {
      let filteredData = allProjects.filter((x) => x.status == 2);
      setPendingProjects(filteredData);
    } else {
      let filteredData = allProjects.filter((option) => {
        if (option.status == 2) {
          return (
            option.projectTitle.toLowerCase().includes(val.target.value.toLowerCase()) ||
            option.techStack.join().toLowerCase().includes(val.target.value.toLowerCase())
          );
        }
      });
      setPendingProjects(filteredData);
    }
  };

  return (
    <StyledTable>
      <ProjectModal
        mode={mode}
        currentProject={projectsRef.current}
        visible={projectModal}
        onCancel={() => setProjectModal(false)}
      />
      <div>
        <ContentHeader
          showSearch={true}
          onSearch={(e) => {
            handleSearch(e);
          }}
          title="Archived Projects"
        />
        <TableWrapper
          tableData={allPendingProjects}
          loading={isLoading}
          showPagination={true}
          columns={[
            {
              Header: "Project Title",
              Cell: ({ original }) => <div>{original.projectTitle}</div>,
              sortable: false,
            },

            {
              Header: "Description",
              Cell: ({ original }) => <div>{original.description}</div>,
              sortable: false,
            },

            {
              Header: "Start Date",
              Cell: ({ original }) => (
                <div>{moment(original.createdAt).format("DD-MMM-YYYY")}</div>
              ),
              sortable: false,
            },

            {
              Header: "Project Status",
              Cell: ({ original }) => (
                <div>
                  {original.status == 2
                    ? "Archived"
                    : original.status == 3
                    ? "Completed"
                    : "On Going"}
                </div>
              ),
              sortable: false,
            },

            {
              Header: "Action",
              Cell: ({ original }) => {
                return (
                  <div>
                    <div
                      onClick={() => {
                        mode.current = "view";
                        projectsRef.current = original;
                        setProjectModal(true);
                      }}
                      title="View Details"
                      className="action-btn"
                    >
                      <AiOutlineEye style={{ fontSize: 16, color: "blue" }} />
                    </div>
                  </div>
                );
              },
              sortable: false,
            },
          ]}
        />
      </div>
    </StyledTable>
  );
};

export default ArchivedProjects;

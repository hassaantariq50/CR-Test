import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableWrapper from "components/table/reactTable";
import ContentHeader from "components/header/contentHeader";
import styled from "styled-components";
import { useLazyQuery, useQuery } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import Queries from "apis/queries";
import Mutations from "apis/mutations";
import { userClient } from "apis/config";
import { errorHandler } from "helpers/errorHandler";
import { message } from "antd";
import moment from "moment";
import ProjectModal from "components/modals/projectModal";
import { ALL_PROJECTS } from "redux/constants";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { MdOutlineDone } from "react-icons/md";

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

const Projects = () => {
  const dispatch = useDispatch();
  const { allProjects } = useSelector((state) => state.allProjects);

  const projectsRef = useRef();
  const mode = useRef("add");

  const [projectModal, setProjectModal] = useState(false);
  const [allPendingProjects, setPendingProjects] = useState([]);
  // const [filterByStatus, setFilterByStatus] = useState(0);

  const {
    data,
    loading: isLoading,
    error,
  } = useQuery(Queries.GET_ALL_PROJECTS, {
    variables: {
      status: 1,
    },
    onError: () => {
      message.error(error.message);
    },
    onCompleted: () => {
      dispatch({ type: ALL_PROJECTS.STORE, payload: data.getAllProjects });
    },
    fetchPolicy: "network-only",
  });

  /**
   * Muatation and handler for edditing existing Project
   */
  const [editProject, { loading: editLoading }] = useMutation(Mutations.UPDATE_PROJECT, {
    client: userClient,
  });

  const handleEditProject = async (status) => {
    let variables = {
      ...projectsRef.current,
      projectId: projectsRef.current._id,
      status: status,
    };
    console.log("variables", variables);
    try {
      const { data } = await editProject({ variables });
      dispatch({ type: ALL_PROJECTS.CHANGE_STATUS, payload: data.updateProject });
      message.success(
        `${projectsRef.current.projectTitle} added to ${
          status == 2 ? "Archived" : "Completed"
        } successfully`
      );
    } catch (err) {
      message.error(errorHandler(err));
    }
  };

  useEffect(() => {
    console.log("all project", allProjects);
    // let filteredData = allProjects.filter((x) => x.status == 1);
    setPendingProjects(allProjects);
  }, [allProjects]);

  const handleSearch = (val) => {
    if (val.target.value == "") {
      // let filteredData = allProjects.filter((x) => x.status == 1);
      setPendingProjects(allProjects);
    } else {
      let filteredData = allProjects.filter((option) => {
        return (
          option.projectTitle.toLowerCase().includes(val.target.value.toLowerCase()) ||
          option.techStack.join().toLowerCase().includes(val.target.value.toLowerCase())
        );
      });
      setPendingProjects(filteredData);
    }
  };

  const handleFilter = (val) => {
    if (val === 1) {
      // Create a new array for sorting
      const sortedData = [...allPendingProjects].sort((a, b) => {
        const titleA = a.projectTitle.toLowerCase();
        const titleB = b.projectTitle.toLowerCase();

        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });

      // Update the state with the sorted data
      setPendingProjects(sortedData);
    } else if (val === 2) {
      // Create a new array for sorting
      const sortedData = [...allPendingProjects].sort((a, b) => {
        const titleA = a.projectTitle.toLowerCase();
        const titleB = b.projectTitle.toLowerCase();

        if (titleA > titleB) {
          return -1;
        }
        if (titleA < titleB) {
          return 1;
        }
        return 0;
      });

      // Update the state with the sorted data
      setPendingProjects(sortedData);
    } else if (val === 3) {
      console.log("val 3");
      // Create a new array for sorting
      const sortedData = [...allPendingProjects].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
      });

      // Update the state with the sorted data
      setPendingProjects(sortedData);
    } else if (val === 4) {
      console.log("val 4");

      // Sort by createdAt (oldest to newest)
      const sortedData = [...allPendingProjects].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateA - dateB;
      });

      // Update the state with the sorted data
      setPendingProjects(sortedData);
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
          onAdd={() => {
            setProjectModal(true);
            mode.current = "add";
          }}
          showSearch={true}
          onSearch={(e) => {
            handleSearch(e);
          }}
          title="All Projects"
          onSelectChange={(e) => handleFilter(e)}
          dropDownOptions={[
            { label: "Alphabetical Order (A-Z)", value: 1 },
            { label: "Reverse alphabetical Order (Z-A)", value: 2 },
            { label: "Newest to Oldest", value: 3 },
            { label: "Oldest to Newest", value: 4 },
          ]}
        />
        <TableWrapper
          tableData={allPendingProjects}
          loading={isLoading}
          showPagination={true}
          totalCount={allPendingProjects.length}
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
                if (original.status == 1) {
                  return (
                    <div style={{ display: "flex" }}>
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

                      <div
                        onClick={() => {
                          mode.current = "edit";
                          projectsRef.current = original;
                          setProjectModal(true);
                        }}
                        title="Edit"
                        className="action-btn"
                      >
                        <AiOutlineEdit style={{ fontSize: 16, color: "blue" }} />
                      </div>

                      <div
                        onClick={() => {
                          projectsRef.current = original;
                          handleEditProject(2);
                        }}
                        title="Archive"
                        className="action-btn"
                      >
                        <BiArchiveIn style={{ fontSize: 16, color: "blue" }} />
                      </div>

                      <div
                        onClick={() => {
                          projectsRef.current = original;
                          handleEditProject(3);
                        }}
                        title="Complete"
                        className="action-btn"
                      >
                        <MdOutlineDone style={{ fontSize: 16, color: "blue" }} />
                      </div>
                    </div>
                  );
                } else if (original.status == 2) {
                  return (
                    <div style={{ display: "flex" }}>
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

                      <div
                        onClick={() => {
                          mode.current = "edit";
                          projectsRef.current = original;
                          setProjectModal(true);
                        }}
                        title="Edit"
                        className="action-btn"
                      >
                        <AiOutlineEdit style={{ fontSize: 16, color: "blue" }} />
                      </div>
                    </div>
                  );
                } else if (original.status == 3) {
                  return (
                    <div style={{ display: "flex" }}>
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
                }
              },
              sortable: false,
            },
          ]}
        />
      </div>
    </StyledTable>
  );
};

export default Projects;

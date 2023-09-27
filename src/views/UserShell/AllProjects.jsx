import React, { useEffect, useRef, useState } from "react";
// import { message, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
// import { USER } from "redux/constants";
// import { useMutation, errorHandler, Queries, Mutations } from "apis/config";
import TableWrapper from "components/table/reactTable";
import ContentHeader from "components/header/contentHeader";
import { ButtonWrapper, TableButton } from "components/buttons";
import styled from "styled-components";
// import { CgTrash } from "react-icons/cg";
// import { ExclamationCircleOutlined } from "@ant-design/icons";

// import RegistrationDetailModal from "components/modals/registrationDetailModal";
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

const StyledTable = styled.div`
  .delete-icon {
    height: 30px;
    width: 30px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

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

  const {
    data,
    loading: isLoading,
    error,
  } = useQuery(Queries.GET_ALL_PROJECTS, {
    onCompleted: () => {
      dispatch({ type: ALL_PROJECTS.STORE, payload: data.getAllProjects });
    },
    onError: () => {
      message.error(error.message);
    },
    fetchPolicy: "network-only",
  });

  /**
   * Muatation and handler for edditing existing Project
   */
  const [editProject, { loading: editLoading }] = useMutation(Mutations.UPDATE_PROJECT, {
    client: userClient,
  });

  const handleEditProject = async () => {
    let variables = {
      ...projectsRef.current,
      projectId: projectsRef.current._id,
      status: 2,
    };
    console.log("variables", variables);
    try {
      const { data } = await editProject({ variables });
      dispatch({ type: ALL_PROJECTS.CHANGE_STATUS, payload: data.updateProject });
      message.success("Added to archived successfully");
    } catch (err) {
      message.error(errorHandler(err));
    }
  };

  useEffect(() => {
    console.log("all project", allProjects);
    // let filteredData = allProjects.filter((x) => x.status == 1);
    setPendingProjects(allProjects);
  }, [allProjects, editLoading, projectModal]);

  const handleSearch = (val) => {
    if (val.target.value == "") {
      let filteredData = allProjects.filter((x) => x.status == 1);
      setPendingProjects(filteredData);
    } else {
      let filteredData = allProjects.filter((option) => {
        if (option.status == 1) {
          return (
            option.projectTitle.toLowerCase().includes(val.target.value.toLowerCase()) ||
            option.techStack.join().toLowerCase().includes(val.target.value.toLowerCase())
          );
        }
      });
      setPendingProjects(filteredData);
    }
  };

  //   const { mutateAsync: getAllUsers, isLoading } = useMutation(Queries.getAllUsers, {
  //     onSuccess: ({ data }) => {
  //       console.log("Registrations Data: ", data.data);
  //       dispatch({ type: USER.STORE, payload: data.data });
  //     },
  //     onError: (err) => message.error(errorHandler(err)),
  //   });

  //   useEffect(() => {
  //     getAllUsers();
  //   }, []);

  //   const { mutateAsync: deleteIndividualUser, isLoading: deleteIndividualUserLoading } =
  //     useMutation(Mutations.deleteIndividualUser);

  //   const handleDeleteIndividualUser = async () => {
  //     try {
  //       const { data } = await deleteIndividualUser({
  //         userId: confimationDeleteModal.userId,
  //       });
  //       setConfimationDeleteModal({ visible: false });
  //       dispatch({ type: USER.STORE, payload: data.data });
  //     } catch (err) {
  //       message.error(errorHandler(err));
  //     }
  //   };

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
              Header: "Action",
              Cell: ({ original }) => {
                return (
                  <div>
                    <TableButton
                      onClick={() => {
                        mode.current = "view";
                        projectsRef.current = original;
                        setProjectModal(true);
                      }}
                    >
                      view
                    </TableButton>

                    <TableButton
                      onClick={() => {
                        mode.current = "edit";
                        projectsRef.current = original;
                        setProjectModal(true);
                      }}
                    >
                      Edit
                    </TableButton>

                    <TableButton
                      onClick={() => {
                        // mode.current = "view";
                        projectsRef.current = original;
                        // setProjectModal(true);
                        handleEditProject();
                      }}
                    >
                      Archived
                    </TableButton>

                    <TableButton
                      onClick={() => {
                        // mode.current = "view";
                        // projectsRef.current = original;
                        // setProjectModal(true);
                      }}
                    >
                      Completed
                    </TableButton>
                  </div>
                );
              },
              sortable: false,
            },

            // {
            //   Header: "Delete",
            //   Cell: ({ original }) => {
            //     return (
            //       <div style={{ width: 45, display: "flex", justifyContent: "center" }}>
            //         <div
            //           className="delete-icon"
            //           title="Delete"
            //           onClick={() => {
            //             setConfimationDeleteModal({ visible: true, userId: original._id });
            //           }}
            //         >
            //           <CgTrash style={{ fontSize: 18, color: "#135bed" }} />
            //         </div>
            //       </div>
            //     );
            //   },
            //   sortable: false,
            // },
          ]}
        />
      </div>
    </StyledTable>
  );
};

export default Projects;

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
import Queries from "apis/queries";
import { userClient } from "apis/config";
import { errorHandler } from "helpers/errorHandler";
import { message } from "antd";
import moment from "moment";
import ProjectModal from "components/modals/projectModal";

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
  //   const { allUsers } = useSelector((state) => state.users);

  const projectsRef = useRef();
  const mode = useRef("add");

  const [state, setState] = useState([]);
  const [projectModal, setProjectModal] = useState(false);

  const [detailModal, toggleDetailModal] = useState(false);
  const [confimationDeleteModal, setConfimationDeleteModal] = useState({
    visible: false,
    userId: "",
  });

  const user = useRef();

  // const [getAllProjects, { data: getProjectsData, loading: isLoading }] = useLazyQuery(
  //   Queries.GET_ALL_PROJECTS,
  //   {
  //     client: userClient,
  //     fetchPolicy: "no-cache",
  //   }
  // );

  // const getProjects = async () => {
  //   try {
  //     const data = getAllProjects();
  //     console.log("data--->", data);
  //   } catch (err) {
  //     console.log("error-->", err);
  //     message.error(errorHandler(err));
  //   }
  // };

  // useEffect(() => {
  //   getProjects();
  // }, []);

  // useEffect(() => {
  //   console.log("getProjectsData", getProjectsData);
  // }, [getProjectsData]);

  const {
    data,
    loading: isLoading,
    error,
  } = useQuery(Queries.GET_ALL_PROJECTS, {
    onCompleted: () => {
      console.log("data", data);
      setState(data.getAllProjects);
    },
    onError: () => {
      message.error(error.message);
    },
    fetchPolicy: "network-only",
  });

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
        // currentPackage={packages.current}
        visible={projectModal}
        onCancel={() => setProjectModal(false)}
      />
      <div>
        <ContentHeader
          onAdd={() => {
            setProjectModal(true);
            mode.current = "add";
          }}
          title="All Projects"
        />

        <TableWrapper
          tableData={state}
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
              Header: "Details",
              Cell: ({ original }) => {
                return (
                  <TableButton
                    onClick={() => {
                      mode.current = "view";
                      projectsRef.current = original;
                      setProjectModal(true);
                    }}
                  >
                    view
                  </TableButton>
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

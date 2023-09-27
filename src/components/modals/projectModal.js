import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Modal, Form, message, Button } from "antd";
import { InputWrapper } from "../input";
import { useMutation } from "@apollo/react-hooks";
import Mutations from "../../apis/mutations";
import { userClient } from "../../apis/config";
import { errorHandler } from "../../helpers/errorHandler";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BsPlusSquare } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { HiCheck, HiX } from "react-icons/hi";
import { ALL_PACKAGES, ALL_PROJECTS } from "redux/constants";
import ImageUploader from "components/uploader/ImageUploader";

import BannerImageUploader from "components/uploader/BannerImageUploader";

const StyledContent = styled.div`
  .numeric-formatt {
    ::placeholder {
      color: #d2d2d2;
    }
  }
  .form-label {
    text-align: left;
    font-size: 16px;
    margin-bottom: 2px;
  }

  .ant-form-item {
    margin: 0px;
  }

  .add-btn {
    background-color: #135bed;
    color: #fff;
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    font-size: 12px;
  }

  .description-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    background-color: #f0f3ff;
    padding: 0px 10px;
    margin: 6px 6px;
    border-radius: 4px;
    border: 1px solid #f0f3ff;
    min-width: 80px;
    border-radius: 50px;
    max-width: max-content;
  }

  .description {
    font-size: 12px;
    color: #2a2a2a;
  }
  .delete-description {
    font-size: 14px;
    color: #2a2a2a;
    cursor: pointer;
    margin-left: 4px;
  }
  .description-container {
    max-height: 180px;
    overflow: auto;
    flex-wrap: wrap;
    display: flex;
    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #d1d1d1ef;
      border-radius: 10px;
    }
  }
`;

const initialState = {
  projectTitle: "",
  description: "",
  imageUrl: "",
  githubLink: "",
  liveLink: "",
  techStack: [],
};

const ProjectModal = (props) => {
  const { visible, onCancel, currentProject, mode, onOk } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const descriptionRef = useRef();
  const { data } = useSelector((state) => state.user);

  const [state, setState] = useState({ ...initialState });
  const [newDescription, setNewDescription] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef("");

  useEffect(() => {
    /**
     * Set all feilds value if editing
     */
    if ((mode?.current == "view" || mode?.current == "edit") && visible) {
      setState(currentProject);
      setFileList([{ url: currentProject.image, id: 1 }]);
      form.setFieldsValue({
        "Project Title": currentProject.projectTitle,
        "Project Description": currentProject.description,
        "Github Link": currentProject.githubLink,
        "Live URL": currentProject.liveLink,
      });
    } else {
      setState({ ...initialState, techStack: [] });
      setFileList([]);
    }
  }, [mode, visible]);

  /**
   * Muatation and handler for adding new Project
   */
  const [addNewProject, { loading: isLoading }] = useMutation(Mutations.ADD_PROJECT, {
    client: userClient,
  });

  const handleAddProject = async () => {
    let variables = {
      projectTitle: state.projectTitle,
      description: state.description,
      imageUrl: fileList[0]?.url,
      githubLink: state.githubLink,
      liveLink: state.liveLink,
      techStack: state.techStack,
    };
    try {
      const { data } = await addNewProject({ variables });
      dispatch({ type: ALL_PROJECTS.ADD_NEW, payload: data.addProject });
      closeModal();
    } catch (err) {
      message.error(errorHandler(err));
    }
  };

  /**
   * Muatation and handler for editing existing Project
   */
  const [editProject, { loading: editLoading }] = useMutation(Mutations.UPDATE_PROJECT, {
    client: userClient,
  });

  const handleEditProject = async () => {
    let variables = {
      projectId: currentProject._id,
      projectTitle: state.projectTitle,
      description: state.description,
      imageUrl: fileList[0]?.url,
      githubLink: state.githubLink,
      liveLink: state.liveLink,
      techStack: state.techStack,
      status: currentProject.status,
    };
    try {
      const { data } = await editProject({ variables });
      dispatch({ type: ALL_PROJECTS.EDIT_DATA, payload: data.updateProject });
      message.success("Updated Successfully");
      closeModal();
    } catch (err) {
      message.error(errorHandler(err));
    }
  };

  const handleChange = (e) => {
    if (e.hasOwnProperty("target")) {
      const { name, value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
    } else {
      const { formattedValue, value, floatValue } = e;
      setState((prev) => ({ ...prev, [inputRef.current]: formattedValue }));
    }
  };

  const closeModal = () => {
    setFileList([]);
    setState({ ...initialState }); // Reset State
    form.resetFields(); // Empty form feilds
    onCancel(); // Close the modal
  };

  return (
    <Modal
      title={
        mode?.current == "view"
          ? "Project Details"
          : mode?.current == "edit"
          ? "Edit Project Details"
          : "Add Project"
      }
      visible={visible}
      onCancel={closeModal}
      footer={null}
      centered
    >
      <StyledContent>
        <Form
          form={form}
          onFinish={
            mode?.current == "add"
              ? handleAddProject
              : mode?.current == "edit"
              ? handleEditProject
              : null
          }
          // validateTrigger="onFinish"
        >
          <Row justify="space-between" gutter={[24, 12]}>
            <Col span={24}>
              <h4 className="form-label">*Project Image</h4>
              <Form.Item name="Image" rules={[{ required: false }]}>
                <BannerImageUploader
                  uploadLength={1}
                  uploadPreset={"travel_agent_packages"}
                  loading={loading}
                  setLoading={setLoading}
                  fileList={fileList}
                  setFileList={setFileList}
                  viewDeleteIcon={mode?.current}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <h4 className="form-label">*Project Title</h4>
              <Form.Item name="Project Title" rules={[{ required: true }]}>
                <InputWrapper
                  readOnly={mode.current == "view" ? true : false}
                  maxLength={20}
                  name="projectTitle"
                  value={state.packageName}
                  placeholder="Project Title"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <h4 className="form-label">*Github Link</h4>
              <Form.Item name="Github Link" rules={[{ required: true }]}>
                <InputWrapper
                  readOnly={mode.current == "view" ? true : false}
                  maxLength={100}
                  name="githubLink"
                  value={state.packageName}
                  placeholder="Github Link"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <h4 className="form-label">*Live URL</h4>
              <Form.Item name="Live URL" rules={[{ required: true }]}>
                <InputWrapper
                  readOnly={mode.current == "view" ? true : false}
                  maxLength={100}
                  name="liveLink"
                  value={state.packageName}
                  placeholder="Live URL"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <h4 className="form-label">*Project Description</h4>
              <Form.Item name="Project Description" rules={[{ required: true }]}>
                <InputWrapper.TextArea
                  rows={4}
                  readOnly={mode.current == "view" ? true : false}
                  maxLength={1000}
                  name="description"
                  value={state.description}
                  placeholder="Project Description"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <h4 className="form-label">*Tech Stack</h4>

              <div className="description-container" ref={descriptionRef}>
                {state.techStack?.map((item, index) => (
                  <div
                    className="description-wrapper"
                    style={{
                      justifyContent:
                        mode.current == "View Package" ? "center" : "space-between",
                    }}
                  >
                    <div key={index} className="description">
                      {item}
                    </div>
                    <HiX
                      className="delete-description"
                      title="Remove"
                      onClick={() => {
                        const i = state.techStack.indexOf(item);
                        console.log("Index", i);
                        state.techStack.splice(i, 1);
                        setState({ ...state });
                      }}
                      style={{
                        display: mode.current == "view" ? "none" : "flex",
                      }}
                    />
                  </div>
                ))}
              </div>

              <InputWrapper
                style={{
                  marginTop: 10,
                  display: mode.current == "view" ? "none" : "flex",
                }}
                placeholder="NodeJS"
                value={newDescription}
                suffix={
                  <div
                    className="add-btn"
                    title="Add"
                    onClick={() => {
                      if (newDescription !== "") {
                        console.log("newDescription", newDescription);
                        state.techStack.push(newDescription);
                        setState({ ...state });
                        descriptionRef.current.scrollTo({
                          top: (state.techStack.length + 1) * 48,
                          behavior: "smooth",
                        });
                        setNewDescription("");
                      }
                    }}
                  >
                    Add
                  </div>
                }
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNewDescription(e.target.value);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (e.target.value !== "") {
                      e.preventDefault();
                      state.packageIncludes.push(e.target.value);
                      setState({ ...state });
                      descriptionRef.current.scrollTo({
                        top: (state.packageIncludes.length + 1) * 48,
                        behavior: "smooth",
                      });
                      e.target.value = "";
                      setNewDescription("");
                    }
                  }
                }}
              />
            </Col>
          </Row>

          <br />

          <Row
            justify="end"
            align="middle"
            style={{ display: mode.current == "view" ? "none" : "flex" }}
          >
            <Col span={7} style={{ paddingLeft: "10px" }}>
              <Button
                style={{
                  outline: "none",
                  border: "1px solid #ffbe04",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                block
                shape="round"
                type="danger"
                size="default"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </Col>
            <Col span={7} style={{ paddingLeft: "10px" }}>
              <Button
                block
                shape="round"
                type="primary"
                size="default"
                style={{ outline: "none", border: "none", backgroundColor: "#ffbe04" }}
                htmlType="submit"
                onClick={onOk}
                loading={isLoading || editLoading}
              >
                {mode?.current == "add"
                  ? "Create"
                  : mode?.current == "edit"
                  ? "Save"
                  : null}
              </Button>
            </Col>
          </Row>
        </Form>
      </StyledContent>
    </Modal>
  );
};

ProjectModal.defaultProps = {
  onCancel: () => {},
  currentProject: { _id: null },
  onOk: () => {},
  mode: "add",
};

export default ProjectModal;

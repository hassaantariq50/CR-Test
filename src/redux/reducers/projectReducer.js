import { ALL_PROJECTS } from "redux/constants";

const initialState = { allProjects: [] };

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PROJECTS.STORE: {
      const { payload } = action;
      return { ...state, allProjects: payload };
    }

    case ALL_PROJECTS.CHANGE_STATUS: {
      const { _id, status } = action.payload;
      const currentProject = state.allProjects.find((project) => project._id === _id);
      currentProject.status = status;
      return { ...state };
    }

    case ALL_PROJECTS.EDIT_DATA: {
      const { payload } = action;
      const currentProjectIndex = state.allProjects.findIndex(
        (project) => project._id === payload._id
      );
      state.allProjects.splice(currentProjectIndex, 1, payload);
      return { ...state };
    }

    case ALL_PROJECTS.ADD_NEW: {
      const { payload } = action;
      return { ...state, allProjects: [...state.allProjects, payload] };
    }

    default:
      return state;
  }
};

export default projectReducer;

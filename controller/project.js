const ProjectModel = require("../models/project");

const projectController = {
  /**
   * insertProject - inserting project .
   * @param object - object that need to be insert
   * @returns {Promise<void>}
   */
  insertProject: async (object) => {
    try {
      let project = new ProjectModel(object);
      await project.save();
      return project;
    } catch (error) {
      throw error;
    }
  },

  /**
   * getProjectByUserId - get project detail by userId.
   * @param userId - user that need to be check.
   * @returns {Promise<void>}
   */
  getProjectByUserId: async (userId) => {
    try {
      let project = await ProjectModel.find({ userId: userId });
      return project;
    } catch (error) {
      return error;
    }
  },

  /**
   * getProjectByStatus - get project detail by userId.
   * @param userId - user that need to be check.
   * @returns {Promise<void>}
   */
  getProjectByStatus: async (userId, status) => {
    try {
      let project = await ProjectModel.find({ userId: userId, status: status });
      return project;
    } catch (error) {
      return error;
    }
  },

  /**
   * updateProjectById - update project by its ID.
   * @param _id - _id that need to check
   * @returns {Promise<void>}
   */
  updateProjectById: async (projectData) => {
    try {
      let project = await ProjectModel.findOneAndUpdate(
        { _id: projectData._id },
        { $set: projectData },
        { new: true }
      );
      return project;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = projectController;

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

  // Example of deliberate code issues in JavaScript
 exampleFunction:  async() => {
  var unusedVariable1 = 10; // Unused variable
  var unusedVariable2 = 10; // Unused variable

  var unusedVariable3 = 10; // Unused variable
  var unusedVariable4 = 10; // Unused variable

  var unusedVariable5 = 10; // Unused variable


  console.log("This is a test."); // No issue here

  // Inconsistent indentation
        if (true) {
        console.log("Inconsistent indentation.");
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

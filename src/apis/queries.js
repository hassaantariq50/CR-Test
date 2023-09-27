import gql from "graphql-tag";

const Queries = {
  GET_ALL_PROJECTS: gql`
    query projects($status: Float) {
      getAllProjects(status: $status) {
        _id
        status
        projectTitle
        createdAt
        description
        imageUrl
        liveLink
        githubLink
        techStack
      }
    }
  `,
};

export default Queries;

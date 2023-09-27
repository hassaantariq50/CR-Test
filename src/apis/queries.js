// import { userModule } from "./config";
// import Cookies from "js-cookie";

// export const Queries = {
//   getCompanyDashboardStats: () => {
//     const headers = { Authorization: Cookies.get("token") };
//     return userModule.get(`/getCompanyDashboard`, { headers });
//   },
//   getCompanyProfile: () => {
//     const headers = { Authorization: Cookies.get("token") };
//     return userModule.get(`/getMyProfile`, { headers });
//   },
//   getCompanyUsers: () => {
//     const headers = { Authorization: Cookies.get("token") };
//     return userModule.get(`/getMyUser`, { headers });
//   },
// };

import gql from "graphql-tag";

const Queries = {
  GET_ALL_PROJECTS: gql`
    {
      getAllProjects {
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

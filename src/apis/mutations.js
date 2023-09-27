// import { userModule } from "./config";
// import Cookies from "js-cookie";

// export const Mutations = {
//   registerAccount: (body) => {
//     return userModule.post("/register", body);
//   },
//   login: (body) => {
//     return userModule.post("/login", body);
//   },
//   logout: (body) => {
//     const headers = { Authorization: Cookies.get("token") };
//     return userModule.post("/logout", body, { headers });
//   },
//   forgotPassword: (body) => {
//     return userModule.post("/forgetPassword", body);
//   },
//   resetPassword: (body) => {
//     return userModule.post("/changePasswordAfterForget", body);
//   },
// };

import gql from "graphql-tag";

const Mutations = {
  SIGN_UP: gql`
    mutation signup($fullName: String!, $email: String!, $password: String!) {
      signupUser(fullName: $fullName, email: $email, password: $password) {
        _id
        fullName
      }
    }
  `,

  SIGN_IN: gql`
    mutation login($email: String!, $password: String!, $deviceId: String!) {
      loginUser(email: $email, password: $password, deviceId: $deviceId) {
        _id
        fullName
        jwtToken {
          jwtToken
          deviceId
        }
      }
    }
  `,

  ADD_PROJECT: gql`
    mutation project(
      $projectTitle: String
      $description: String
      $imageUrl: String
      $techStack: [String]
      $githubLink: String
      $liveLink: String
    ) {
      addProject(
        projectTitle: $projectTitle
        description: $description
        imageUrl: $imageUrl
        techStack: $techStack
        githubLink: $githubLink
        liveLink: $liveLink
      ) {
        _id
        projectTitle
        description
        imageUrl
        techStack
        githubLink
        liveLink
      }
    }
  `,

  UPDATE_PROJECT: gql`
    mutation project(
      $projectId: String
      $projectTitle: String
      $description: String
      $imageUrl: String
      $techStack: [String]
      $githubLink: String
      $liveLink: String
      $status: Float
    ) {
      updateProject(
        projectId: $projectId
        projectTitle: $projectTitle
        description: $description
        imageUrl: $imageUrl
        techStack: $techStack
        githubLink: $githubLink
        liveLink: $liveLink
        status: $status
      ) {
        _id
        projectTitle
        description
        imageUrl
        techStack
        githubLink
        liveLink
        status
      }
    }
  `,

  LOGOUT: gql`
    mutation logout($deviceId: String!) {
      logoutUser(deviceId: $deviceId) {
        _id
        fullName
      }
    }
  `,
};

export default Mutations;

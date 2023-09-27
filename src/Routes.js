import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { USER } from "redux/constants";
import Cookies from "js-cookie";
// Register and Login Screen
import RegisterAccount from "views/RegisterAccount";
import Login from "./views/Login";
// Users Shell
import UserShell from "views/UserShell";

const Routes = (props) => {
  const { isLoggedIn, updateUser } = props;

  useEffect(() => {
    /**
     * Used to persisit data on refresh
     */
    if (isLoggedIn) {
      const data = JSON.parse(Cookies.get("_W_U_DATA_"));
      const userRole = Number(data.userRole);
      updateUser({ data, userRole });
    }
  }, [isLoggedIn, updateUser]);

  const renderView = () => {
    // 1 = user, 2 = company, 3 = guide
    if (isLoggedIn) {
      // if (userRole === 1) {
      return <UserShell />;
      //   } else if (userRole === 2) {
      //     return <CompanyShell />;
      //   } else if (userRole === 3) {
      //     return <GuideShell />;
      //   } else {
      //     return <div />;
      //   }
    } else {
      return <Login />;
    }
  };

  return (
    <Switch>
      <Route exach path="/register" component={RegisterAccount} />
      <Route path="/">{renderView()}</Route>
    </Switch>
  );
};

const mapState = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  userRole: state.user.userRole,
});

const mapDispatch = (dispatch) => ({
  updateUser: (payload) => dispatch({ type: USER.UPDATE, payload }),
});

export default connect(mapState, mapDispatch)(Routes);

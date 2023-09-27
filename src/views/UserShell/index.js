import { useState, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, message } from "antd";
import HeaderWrapper from "components/header/headerWrapper";
import FooterWrapper from "components/footer/footerWrapper";
import SidebarWrapper from "components/sidebar/sidebarWrapper";
// import { errorHandler, useMutation, Mutations } from "apis/config";
/**
 * Routes
 */
import Dashboard from "./Dashboard";
import Projects from "./AllProjects";

const { Content } = Layout;

const UserShell = () => {
  const [collapsed, toggleCollapsed] = useState(true);

  return (
    <div>
      <Layout>
        <div style={{ maxHeight: "100vh" }}>
          <SidebarWrapper collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </div>

        <Layout>
          <HeaderWrapper collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <div
            style={{
              maxHeight: "calc(100vh - 49px)",
              overflow: "auto",
              backgroundColor: "#F4F6FB",
            }}
          >
            <section style={{ minHeight: "calc(100vh - 115px)", overflow: "auto" }}>
              <Content style={{ padding: 44, backgroundColor: "#F4F6FB" }}>
                <Switch>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/dashboard/projects/all" component={Projects} />

                  {/* <Route exact path="/download" component={Download} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/knowledge-center" component={KnowledgeCenter} />
                  <Route exact path="/message/:messageId" component={MessageThread} /> */}
                </Switch>
              </Content>
            </section>
            <FooterWrapper />
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default UserShell;

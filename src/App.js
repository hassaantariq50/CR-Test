import { store } from "./redux/configStore";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
// import "react-calendar/dist/Calendar.css";
import "react-phone-number-input/style.css";
import "./App.scss";
import Routes from "./Routes";
// import { QueryClient, QueryClientProvider } from "react-query";

import { Provider } from "react-redux";
import { userClient } from "./apis/config";
import { ApolloProvider } from "react-apollo";

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={userClient}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
}

export default App;

import Layout from "./layouts";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;

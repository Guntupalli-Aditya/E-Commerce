import React from "react";
import Layout from "../Common Pages/Layout";
import UserMenu from "./UserMenu";
import { useAuth } from "../Authentication Pages/context";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
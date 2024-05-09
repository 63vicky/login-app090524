import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    if (
      localStorage.getItem("token") == "" ||
      localStorage.getItem("token") == null
    ) {
      navigate("/");
    } else {
      getUser();
    }
  }, []);

  const getUser = () => {
    axios
      .get("/api/user", {
        headers: { Authorization: "Bearer" + localStorage.getItem("token") },
      })
      .then((r) => {
        setUser(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logoutAction = () => {
    axios
      .post(
        "/api/logout",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((r) => {
        localStorage.setItem("token", "");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Layout>
      <div className="row justify-content-md-center ">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid ">
              <div className="navbar-brand ">Dashboard</div>
              <button className="nav-link" onClick={() => logoutAction()}>
                Logout
              </button>
            </div>
          </nav>
        </div>

        <div className="col-12">
          <h1>Welcome, {user.name} User</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

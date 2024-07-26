import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../actions/users";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

const Home = ({ username }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const role = localStorage.getItem("role");
  const handleSubmit = () => {
    dispatch(clearUser());
    localStorage.clear();
    navigation("/login");
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: "#9900FA" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={"/userhome"}
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "15px",
              }}
            >
              {!username ? "" : username}
            </Link>
          </Typography>
          {role === "manager" && (
            <>
              <Button
                component={Link}
                to={"/employeeDetails"}
                color="inherit"
                style={{ color: "white" }}
              >
                Employee Detail
              </Button>
              <Button
                component={Link}
                to={"/department"}
                color="inherit"
                style={{ color: "white", marginLeft: "15px" }}
              >
                Department
              </Button>
            </>
          )}
          {!username ? (
            <>
              <Button
                component={Link}
                to={"/registration"}
                color="inherit"
                style={{ color: "white", marginLeft: "15px" }}
              >
                Registration
              </Button>
              <Button
                component={Link}
                to={"/login"}
                color="inherit"
                style={{ color: "white", marginLeft: "15px" }}
              >
                Login
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleSubmit}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Home;

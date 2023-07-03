import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  searchbar: {
    backgroundColor: "#379683",
    borderRadius: "7px",
    padding: "10px",
    fontFamily: "Noto Sans",
    fontWeight: "500",
    color: "#2a2d41",
  },

  title: {
    fontFamily: "Noto Sans",
    fontWeight: "500",
    display: "none",
    color: "#2a2d41",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    fontFamily: "Noto Sans",
    fontWeight: "500",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    borderRadius: "7px",
    marginRight: "10px",
    marginLeft: 0,
    width: "99%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "10px",
      width: "95%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2a2d41",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    fontFamily: "Noto Sans",
    fontWeight: "500",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontFamily: "Noto Sans",
    fontWeight: "500",
    [theme.breakpoints.up("md")]: { width: "100%" },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

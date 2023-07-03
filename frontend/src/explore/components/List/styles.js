import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  menuItem: {
    fontFamily: "Noto Sans",
    fontWeight: "500",
  },
  info: {
    fontFamily: "Noto Sans",
    fontWeight: "500",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: "30px",
    fontFamily: "Noto Sans",
    fontWeight: "500",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    height: "75vh",
    overflow: "auto",
    fontFamily: "Noto Sans",
    fontWeight: "500",
  },
}));

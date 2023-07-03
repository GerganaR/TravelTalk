import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  title: { fontFamily: "Montserrat", fontSize: "1.5rem", fontWeight: "600" },
  chip: {
    margin: "5px 5px 5px 0",
    backgroundColor: "#edf5e1",
    fontFamily: "Noto Sans",
  },
  info: {
    fontFamily: "Noto Sans",
  },
  buttonText: {
    fontFamily: "Noto Sans",
    fontWeight: "700",
    color: "#379683",
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
    fontFamily: "Noto Sans",
  },
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Noto Sans",
  },
  star: {
    color: "#379683",
    fontFamily: "Noto Sans",
  },
}));

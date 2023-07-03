import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  typography: {
    fontFamily: "Noto Sans",
    fontWeight: "500",
  },
  rating: {
    color: "#379683",
  },
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
    borderRadius: "4px",
  },
  mapContainer: {
    height: "100%",
    width: "100%",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  pointer: {
    cursor: "pointer",
  },
}));

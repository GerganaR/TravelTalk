import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";

const Searchbar = ({ onPlaceChanged, onLoad }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchbar}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Търси по населено място..."
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
          />
        </div>
      </Autocomplete>
    </div>
  );
};

export default Searchbar;

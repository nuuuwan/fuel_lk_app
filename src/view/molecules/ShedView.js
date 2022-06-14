import * as React from "react";

import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

export default function ShedView({ shedBasic }) {
  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocalGasStationIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={shedBasic.shedName}
          secondary={shedBasic.lastUpdateByShedDate.toLocaleString('en-GB')}
        />
      </ListItem>
    </div>
  );
}

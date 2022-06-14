import List from "@mui/material/List";

import ShedView from "../../view/molecules/ShedView";

export default function ShedsView({ shedBasics }) {
  return (
    <List>{
      shedBasics.map(function (shedBasic, iShed) {
        return <ShedView key={"shed-" + iShed} shedBasic={shedBasic} />;
      })
    }</List>
  )
}

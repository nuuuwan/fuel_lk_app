import Avatar from "@mui/material/Avatar";

const DIM = 24;
export default function LogoAvatar() {
  return (
    <Avatar
      alt={"logo"}
      src={process.env.PUBLIC_URL + "/logo192.png"}
      sx={{ width: DIM, height: DIM }}
    />
  );
}

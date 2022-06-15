import Avatar from "@mui/material/Avatar";

const DIM = 24;
export default function ShedAvatar({ shedStatus }) {
  const shedType = shedStatus["shed_type"];
  let src = null;
  let alt = null;

  if (shedType === 1) {
    src = "cpetco.png";
    alt = "CPETCO";
  } else if (shedType === 2) {
    src = "lankaioc.png";
    alt = "Lanka IOC";
  }

  return (
    <Avatar
      alt={alt}
      src={process.env.PUBLIC_URL + "/" + src}
      sx={{ width: DIM, height: DIM }}
    />
  );
}

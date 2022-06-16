import Link from "@mui/material/Link";

const STYLE = {
  textDecoration: "none",
  color: "gray",
}

export default function _Link({ href, children }) {
  return (
    <Link href={href} target="_blank" style={STYLE}>
      {children}
    </Link>
  );
}

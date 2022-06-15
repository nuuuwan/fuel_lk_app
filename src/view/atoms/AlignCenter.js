import Stack from "@mui/material/Stack";

export default function AlignCenter({ children }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      {children}
    </Stack>
  );
}

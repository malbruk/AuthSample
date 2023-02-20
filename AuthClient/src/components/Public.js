import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Application from "./Application";

export default function Public() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          דף ציבורי
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          את המידע בדף הזה יכולים לראות כל המבקרים באתר.
          <br />
          אין צורך להתחבר כדי לצפות בדף זה.
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
        >
          מידע על האפליקציה
        </Typography>
        <Application></Application>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Button variant="outlined">התחברות</Button>
          </Link>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <Button variant="contained">הרשמה</Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

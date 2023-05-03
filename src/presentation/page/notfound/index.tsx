import React from "react";
import { Box, Container,  Typography } from "@mui/material";

export default () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "calc(100vh - 150px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
      }}
      >
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h1" component="h1">
          Not Found
        </Typography>
      </Box>
    </Container>
  );
};

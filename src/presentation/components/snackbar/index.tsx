import { Slide, Snackbar as Snack, Stack } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { snackbarState } from "./atom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Snackbar: React.FC = () => {
  const [snackbar, setSnackbarState] = useRecoilState(snackbarState);

  const handleClose = (_, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarState({ open: false, message: "", type: "success" });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snack
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        TransitionComponent={(props) => <Slide {...props} direction="right" />}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          sx={{ width: "400px" }}
        >
          {snackbar.message}
        </Alert>
      </Snack>
    </Stack>
  );
};

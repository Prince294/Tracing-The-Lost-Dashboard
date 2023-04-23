import * as React from "react";
import Dialog from "@mui/material/Dialog";

export default function UserIdVerificationPopup({
  open,
  handleClose,
  imageUrl,
}) {
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{ overflow: "hidden" }}
      >
        <img
          src={imageUrl}
          alt="User Verification Image"
          className="popup_verification_image"
        />
      </Dialog>
    </div>
  );
}

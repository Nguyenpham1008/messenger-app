import React, { FC } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const Account: FC<{ name: string; email: string; id: number }> = ({ name, email, id }) => {
  return (
    <Link href={`/users/${id}/conversations`} passHref>
      <Button variant="outlined" sx={{ marginTop: "10px", borderRadius: "5px", textTransform: "none" }}>
        <div style={{ display: "flex", alignItems: "center", paddingRight: "100px" }}>
          <Avatar sx={{ marginRight: "10px" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h5 style={{ margin: "5px" }}>{name}</h5>
            <h6 style={{ margin: "5px" }}>{email}</h6>
          </div>
        </div>
      </Button>
    </Link>
  );
};

export default Account;

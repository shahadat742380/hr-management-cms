//  ** import core packages**
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

//  ** import components**
import { Typography } from "@/components/typography";

//  ** import ui component **
import { Button } from "@/components/ui/button";

const ResetSucceeded = () => {
  const router = useRouter();

  return (
    <Fragment>
      <Typography variant="Regular_H6" className="mt-6 block text-center text-muted-foreground">
        You can now use your new password to log in to your account.
      </Typography>
      <Button
        type="submit"
        className="mt-6 w-full bg-primary"
        onClick={() => {
          router.push("/login");
        }}
      >
        <Typography variant="Medium_H6" className="mt-0 mb-0 block text-white">
          Login
        </Typography>
      </Button>
    </Fragment>
  );
};

export default ResetSucceeded;

"use client";

//  ** import core packages *
import { useState } from "react";

// ** import image
import bannerImage from "@/assets/images/auth/auth-img.webp";

// ** import components
import AuthWrapper from "@/components/auth-wrapper/index";

import ResetForm from "./_components/reset-form";
//  ** import sections **:
import ResetSucceeded from "./_components/reset-succeeded";

const ResetPassword = () => {
  const [isResetSucceeded, setIsResetSucceeded] = useState(false);

  return (
    <AuthWrapper
      title="Reset password "
      subtitle={isResetSucceeded ? "" : "Lorem ipsum dolor sit amet"}
      titleClassName={isResetSucceeded ? "" : "mt-6 lg:mt-16"}
      headerIconClassName="mt-20"
      headerIcon={isResetSucceeded}
      bannerImage={bannerImage}
    >
      {isResetSucceeded ? (
        <ResetSucceeded />
      ) : (
        <ResetForm setIsResetSucceeded={setIsResetSucceeded} />
      )}
    </AuthWrapper>
  );
};

export default ResetPassword;

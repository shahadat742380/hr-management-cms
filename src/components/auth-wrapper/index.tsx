"use client";

// ** import core package
import Image, { StaticImageData } from "next/image";

// ** import component
import { Typography } from "../typography";

// ** import custom icon
import { IcoCheck, IcoMainLogo } from "@/assets/icons";

// ** import utils
import { cn } from "@/lib/utils";
import Footer from "../footer";
import { ChevronLeft } from "lucide-react";

interface IAuthWrapperProps {
  title: string;
  titleClassName?: string;
  subtitle?: string | React.ReactNode;
  subtitleClassName?: string;
  children: React.ReactNode;
  backPath?: string;
  headerIcon?: boolean;
  headerIconClassName?: string;
  bannerImage: StaticImageData;
}

const AuthWrapper = ({
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  children,
  backPath,
  headerIcon,
  headerIconClassName,
  bannerImage,
}: IAuthWrapperProps) => {
  return (
    <>
      <div className="relative bg-background min-h-screen">
        <div className="fixed top-0 left-0 hidden h-full w-1/2 lg:block">
          <Image
            src={bannerImage ? bannerImage : ""}
            alt="Banner"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex min-h-screen items-center justify-center px-5 md:px-0">
          <div className="hidden w-1/2 lg:block" />
          <div className="relative mx-auto w-full max-w-xs">
            <div className="flex justify-center text-foreground">
              <IcoMainLogo />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              {headerIcon && (
                <div className={cn("mb-10 text-primary", headerIconClassName)}>
                  <IcoCheck />
                </div>
              )}

              <Typography
                variant="SemiBold_H3"
                className={cn("text-foreground", titleClassName)}
              >
                {title}
              </Typography>
              <Typography
                variant="Regular_P"
                className={cn("text-muted-foreground text-center", subtitleClassName)}
              >
                {subtitle}
              </Typography>
            </div>
            <div className="mt-4">{children}</div>

            {backPath && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="text-muted-foreground">
                  <ChevronLeft />
                </div>
                <Typography
                  link={backPath}
                  variant="Medium_H6"
                  className={cn(
                    "text-muted-foreground transition-colors hover:text-primary",
                    "no-underline"
                  )}
                >
                  Go Back
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AuthWrapper;

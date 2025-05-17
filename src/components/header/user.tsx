// ** import core package
import { Fragment, useState, useEffect } from "react";
import Link from "next/link";

// ** import ui components
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog } from "../ui/dialog";
import { Separator } from "../ui/separator";
import LogoutDialog from "../dialog/log-out-dialog";


// Define props type
interface UserNavProps {
  image?: string | null;
}

export function UserNav({ image }: UserNavProps) {
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const [orgSlug, setOrgSlug] = useState<string | null>(null);

  // Use useEffect to safely access localStorage only in the client
  useEffect(() => {
    setOrgSlug(localStorage.getItem("currentOrgSlug"));
  }, []);

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {image ? (
                <AvatarImage src={image} alt="User Avatar" />
              ) : (
                <AvatarImage src={"/image-placeholder.png"} alt="User Avatar" />
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={"/settings"} className="block w-full">
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/organization/${orgSlug}`} className="block w-full">
                Organization Settings
              </Link>
            </DropdownMenuItem>

            <Separator />
            <DropdownMenuItem onClick={() => setOpenLogoutModal(true)} className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog open={openLogoutModal} onOpenChange={setOpenLogoutModal} />
    </Fragment>
  );
}

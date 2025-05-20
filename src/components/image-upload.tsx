"use client";

import { useState, useRef, useEffect } from "react";

//  ** Import components **
import { Typography } from "./typography";

//  ** Import ui components **
import { Avatar, AvatarImage } from "@/components/ui/avatar";

//  ** Import utils**
import { cn } from "@/lib/utils";
interface FileUploadProps {
  initialImage?: string;
  onUpdate?: (file: File) => void;
  onRemove?: () => void;
  className?: string;
}

export default function FileUpload({
  initialImage,
  onUpdate,
  onRemove,
  className,
}: FileUploadProps) {
  const [image, setImage] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    } else {
      setImage("/image-placeholder.png");
    }
  }, [initialImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onUpdate?.(file);
    }
  };

  const handleUpdate = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onRemove?.();
  };

  return (
    <div
      className={cn("flex items-center gap-4 border border-gray bg-background p-4 px-6", className)}
    >
      <Avatar className="h-24 w-24 overflow-hidden rounded-full border-primary">
        {image ? (
          <AvatarImage src={image} alt="upload image" />
        ) : (
          <AvatarImage src={"/image-placeholder.png"} alt="default image" />
        )}
      </Avatar>

      <div className="flex gap-3">
        {/* <Button variant="ghost" type="button"> */}
        <Typography
          variant="Medium_H6"
          className="cursor-pointer text-primary hover:text-primary "
          onClick={handleUpdate}
        >
          Update
        </Typography>
        {/* </Button> */}
        {/* <Button variant="ghost" className="" type="button"> */}
        <Typography
          variant="Medium_H6"
          className="cursor-pointer text-gray-500 hover:text-destructive"
          onClick={handleRemove}
        >
          Remove
        </Typography>
        {/* </Button> */}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

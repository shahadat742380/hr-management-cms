"use client";

// ** import core package
import { useState, useRef, useEffect } from "react";

// ** import third party package

// ** import components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ** import libs

export function BrandSetting() {
  const DEFAULT_COLOR = "#020C6A";
  const [loading, setLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>("Logo.png");
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  // On mount, get color from localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem("primaryBrandColor");
    if (savedColor) {
      setColor(savedColor);
      document.documentElement.style.setProperty("--primary", savedColor);
      document.documentElement.style.setProperty("--color-primary", savedColor);
    } else {
      document.documentElement.style.setProperty("--primary", DEFAULT_COLOR);
      document.documentElement.style.setProperty(
        "--color-primary",
        DEFAULT_COLOR
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    document.documentElement.style.setProperty("--primary", newColor);
    document.documentElement.style.setProperty("--color-primary", newColor);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    // Save color to localStorage
    localStorage.setItem("primaryBrandColor", color);
    document.documentElement.style.setProperty("--primary", color);
    document.documentElement.style.setProperty("--color-primary", color);
    // TODO: Implement save changes logic (upload logo, save color)
    console.log("Saving logo:", companyLogo);
    console.log("Saving primary brand color:", color);
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleReset = () => {
    // Remove color from localStorage and reset to default
    localStorage.removeItem("primaryBrandColor");
    setColor(DEFAULT_COLOR);
    document.documentElement.style.setProperty("--primary", DEFAULT_COLOR);
    document.documentElement.style.setProperty(
      "--color-primary",
      DEFAULT_COLOR
    );
    setCompanyLogo(null);
    setLogoFileName("Logo.png");
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base">Brand</h3>
          <p className="text-muted-foreground text-sm">
            Upload your company logo and set the primary brand color for your
            account.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Upload Company Logo */}
        <div className="space-y-2">
          <Label htmlFor="company-logo">Upload Company Logo</Label>
          <div className="flex items-center gap-2">
            <input
              id="company-logo-hidden"
              type="file"
              accept=".png,.jpg,.jpeg"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setCompanyLogo(file);
                  setLogoFileName(file.name);
                } else {
                  setCompanyLogo(null);
                  setLogoFileName("Logo.png");
                }
              }}
              className="hidden"
            />
            <Input
              id="company-logo"
              placeholder="Company Logo"
              value={logoFileName}
              readOnly
              className="flex-grow"
            />
            <Button type="button" onClick={handleBrowseClick}>
              Browse
            </Button>
          </div>
        </div>

        {/* Primary Brand Color */}
        <div className="space-y-2">
          <Label htmlFor="primary-brand-color">Primary Brand Color</Label>
          <div className="flex items-center gap-2">
            <input
              id="primary-brand-color"
              type="color"
              value={color}
              onChange={(e) => handleChange(e)}
              className="w-12 h-10 p-0 border-none"
            />
            <Input value={color} readOnly className="flex-grow" />
          </div>
        </div>
      </div>

      {/* Removed Two-Factor Authentication based on the image */}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSaveChanges} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

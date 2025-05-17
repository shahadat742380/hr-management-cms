import AuthWrapper from "@/components/auth-access-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthWrapper>{children}</AuthWrapper>;
}

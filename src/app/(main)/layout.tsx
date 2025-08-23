export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // here we have to set common layout like sidebar and header
  // so we don't need to handle for auth-login page it will default layout where there is no sidebar and header

  return (
    <>
      {children}
    </>
  )
}
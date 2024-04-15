import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* <Navbar/> */}
      <main>{children}</main>
    </>
  );
};

export default Layout;

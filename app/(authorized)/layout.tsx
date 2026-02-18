import { PseduoComponent } from "@/components/common/pseudo-component";
import { ReactNode } from "react";

export default function AuthorizedLayoud({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {" "}
      <PseduoComponent /> {children}
    </>
  );
}

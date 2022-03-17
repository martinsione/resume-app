import { HiOutlineExternalLink } from "react-icons/hi";

import cl from "@lib/cl";

interface Props {
  icon?: boolean;
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLink({ className, children, href, icon = true }: Props) {
  return (
    <a
      className={cl("flex w-fit items-center gap-1 hover:underline", className || "")}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      {icon && (
        <span>
          <HiOutlineExternalLink />
        </span>
      )}
    </a>
  );
}

import { cn } from "@/lib/utils";

interface IHeading extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children?: JSX.Element;
}

export default function Heading({
  title,
  children,
  className,
  ...props
}: IHeading) {
  return (
    <div
      className={cn(
        "h-[10vh] -mt-8 -mx-4 flex items-center justify-between px-4 border-b border-b-border",
        className
      )}
      {...props}
    >
      <h2 className="text-xl md:text-2xl font-semibold tracking-wide">{title}</h2>
      {children}
    </div>
  );
}

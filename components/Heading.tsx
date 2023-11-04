export default function Heading({ children }: { children: string }) {
  return (
    <div className="h-[10vh] -mt-8 -mx-4 flex items-center justify-start px-4 border-b border-b-zinc-900">
      <h2 className="md:text-xl font-semibold tracking-wide">{children}</h2>
    </div>
  );
}

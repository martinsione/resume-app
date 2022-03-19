interface Props {
  children: React.ReactNode;
  label: string;
}

export default function Tooltip({ children, label }: Props) {
  return (
    <div className="group relative flex w-fit flex-col items-center">
      {children}
      <div className="absolute bottom-0 mb-6 hidden select-none flex-col items-center group-hover:flex">
        <span className="z-50 whitespace-nowrap rounded-lg bg-gray-900 py-2 px-3 text-sm text-white">
          {label}
        </span>
        <span className="-mt-2 h-3 w-3 rotate-45 bg-gray-900" />
      </div>
    </div>
  );
}

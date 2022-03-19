export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="select-none appearance-none rounded-md bg-blue-500 px-4 py-2 font-medium capitalize tracking-wide text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 active:bg-blue-700"
      type="button"
    >
      {children}
    </button>
  );
}

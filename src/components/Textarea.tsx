import { forwardRef } from "react";

const Textarea = forwardRef((props: any, ref) => (
  <div className="flex h-full flex-col gap-1">
    <label className="text-xs text-zinc-600" htmlFor={props.name}>
      {props.label}
      {props.required && "*"}
    </label>
    <textarea
      ref={ref}
      className="block w-full flex-grow resize-none rounded-lg border border-gray-300 bg-gray-50 py-2 px-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      {...props}
    >
      {props.children}
    </textarea>
  </div>
));

export default Textarea;

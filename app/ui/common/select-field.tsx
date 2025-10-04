import { ReactNode } from "react";

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  icon?: ReactNode;
  defaultValue?: string;
  options: { value: string; label: string }[];
  errors?: string[];
}

export default function SelectField({
  id,
  name,
  label,
  icon,
  defaultValue,
  options,
  errors = [],
}: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue={defaultValue}
          className={`peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 ${
            icon ? "pl-10" : "pl-3"
          } text-sm outline-2 placeholder:text-gray-500`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
      </div>
      {errors.length > 0 && (
        <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
          {errors.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

import { ReactNode } from "react";

interface NumberInputFieldProps {
  id: string;
  name: string;
  label: string;
  defaultValue?: string | number;
  placeholder?: string;
  step?: string;
  icon?: ReactNode;
  errors?: string[];
}

export default function NumberInputField({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  step = "0.01",
  icon,
  errors = [],
}: NumberInputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="number"
          step={step}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`peer block w-full rounded-md border border-gray-200 py-2 ${
            icon ? "pl-10" : "pl-3"
          } text-sm outline-2 placeholder:text-gray-500`}
        />
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

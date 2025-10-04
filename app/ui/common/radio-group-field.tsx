"use client";

import { JSX } from "react";

interface RadioOption {
  id: string;
  value: string;
  label: string;
  icon: JSX.Element;
  className: string;
}

interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
  defaultValue: string;
  errors?: string[];
}

export default function RadioGroupField({
  name,
  label,
  options,
  defaultValue,
  errors = [],
}: RadioGroupFieldProps) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-medium">{label}</legend>
      <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
        <div className="flex gap-4">
          {options.map((option) => (
            <div className="flex items-center" key={option.id}>
              <input
                id={option.id}
                name={name}
                type="radio"
                value={option.value}
                defaultChecked={defaultValue === option.value}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label
                htmlFor={option.id}
                className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${option.className}`}
              >
                {option.label} {option.icon}
              </label>
            </div>
          ))}
        </div>
      </div>
      {errors.length > 0 && (
        <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
          {errors.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      )}
    </fieldset>
  );
}

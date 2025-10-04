"use client";

import { CustomerField, InvoiceForm } from "@/app/lib/definitions";
import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { State, updateInvoice } from "@/app/lib/actions";

import {
  UserCircleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import SelectField from "../common/select-field";
import NumberInputField from "../common/number-input-field";
import RadioGroupField from "../common/radio-group-field";

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Select */}
        <SelectField
          id="customer"
          name="customerId"
          label="Choose customer"
          icon={<UserCircleIcon className="h-[18px] w-[18px]" />}
          defaultValue={state.values?.customerId ?? invoice.customer_id}
          options={customers.map((customer) => ({
            value: customer.id,
            label: customer.name,
          }))}
          errors={state.errors?.customerId ?? []}
        />

        {/* Amount Input */}
        <NumberInputField
          id="amount"
          name="amount"
          label="Choose an amount"
          placeholder="Enter USD amount"
          step="0.01"
          icon={<CurrencyDollarIcon className="h-[18px] w-[18px]" />}
          defaultValue={state.values?.amount ?? invoice.amount}
          errors={state.errors?.amount ?? []}
        />

        {/* Status Radio Group */}
        <RadioGroupField
          name="status"
          label="Set the invoice status"
          defaultValue={state.values?.status ?? invoice.status}
          options={[
            {
              id: "pending",
              value: "pending",
              label: "Pending",
              icon: <ClockIcon className="h-4 w-4" />,
              className: "bg-gray-100 text-gray-600",
            },
            {
              id: "paid",
              value: "paid",
              label: "Paid",
              icon: <CheckIcon className="h-4 w-4" />,
              className: "bg-green-500 text-white",
            },
          ]}
          errors={state.errors?.status ?? []}
        />
        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}

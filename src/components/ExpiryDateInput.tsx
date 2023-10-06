import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { FormInputs } from '../types'

interface ExpiryDateInputProps {
  register: UseFormRegister<FormInputs>
  errors: FieldErrors
}

export function ExpiryDateInput({ register, errors }: ExpiryDateInputProps) {
    return (
        <div className="flex flex-col gap-2">
          <label className="text-blue-700 font-medium text-sm" htmlFor="expiryDate">Expiry Date</label>
          <input
            className={`w-full bg-zinc-200 h-10 text-lg rounded border p-2 outline-blue-400 focus:shadow ${errors.expiryDate ? "border-red-400" : "border-zinc-800/20"}`}
            {...register("expiryDate", {
              required: "This is required.",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "This input needs to be in mm/yy format",
              },
            })}
            name="expiryDate"
            id="expiryDate"
            aria-invalid={errors.expiryDate ? "true" : "false"}
            placeholder="03/25"
          />
          <ErrorMessage
            errors={errors}
            name="expiryDate"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <span className="text-red-400" key={type}>{message}</span>
              ))
            }
        />
        </div>
    )
}
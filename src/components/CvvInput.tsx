import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { FormInputs } from '../types'

interface CvvInputProps {
    register: UseFormRegister<FormInputs>
    errors: FieldErrors
}

export function CvvInput({ register, errors }: CvvInputProps) {
    return (
        <div className="flex flex-col gap-2">
          <label className="text-blue-700 font-medium text-sm" htmlFor="cvv">CVV</label>
          <input
            className={`w-full bg-zinc-200 h-10 text-lg rounded border p-2 outline-blue-400 focus:shadow ${errors.cvv ? "border-red-400" : "border-zinc-800/20"}`}
            {...register("cvv", {
              required: "This is required.",
              pattern: {
                value: /^[0-9]+$/,
                message: "This input is numbers only",
              },
            })}
            name="cvv"
            id="cvv"
            aria-invalid={errors.cvv ? "true" : "false"}
            placeholder="155"
          />
          <ErrorMessage
            errors={errors}
            name="cvv"
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
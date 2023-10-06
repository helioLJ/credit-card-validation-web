import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { FormInputs } from '../types'

interface CardNumberInputProps {
    register: UseFormRegister<FormInputs>
    errors: FieldErrors
}

export function CardNumberInput({ register, errors }: CardNumberInputProps) {
    return (
        <div className="flex flex-col gap-2">
        <label className="text-blue-700 font-medium text-sm" htmlFor="cardNumber">Card Number</label>
        <input
            className={`w-full bg-zinc-200 h-10 text-lg rounded border p-2 outline-blue-400 focus:shadow ${errors.cardNumber ? "border-red-400" : "border-zinc-800/20"}`}
            {...register("cardNumber", {
            required: "This is required.",
            pattern: {
                value: /^[0-9]+$/,
                message: "This input is numbers only",
              },
            })}
            name="cardNumber"
            id="cardNumber"
            aria-invalid={errors.cardNumber ? "true" : "false"}
            placeholder="0000000000000000"
        />
        <ErrorMessage
            errors={errors}
            name="cardNumber"
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
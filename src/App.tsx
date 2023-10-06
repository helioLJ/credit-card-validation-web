import { useState } from "react"
import { useForm } from "react-hook-form"
import { CardNumberInput } from "./components/CardNumberInput"
import { ExpiryDateInput } from "./components/ExpiryDateInput"
import { CvvInput } from "./components/CvvInput"
import { FormInputs } from "./types"
import { DynamicVisualCard } from "./components/DynamicVisualCard"

export default function App() {
  const [status, setStatus] = useState<{ code: number, message: string }>({ code: 0, message: "" })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormInputs>({
    criteriaMode: "all",
  })

  const onSubmit = (data: FormInputs) => {
    fetch("http://localhost:8080/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const errorMessage = await response.text()
        setStatus({ code: response.status, message: errorMessage })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <p className="text-center font-sans absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Use this <a className="text-blue-500" target="_blank" href="https://www.creditcardvalidator.org/generator">Fake Credit Card Number Generator</a></p> 
      <form className="relative bg-zinc-100 font-sans h-[500px] w-full min-w-[200px] flex flex-col gap-4 p-8 pt-40 rounded-md shadow-lg" onSubmit={handleSubmit(onSubmit)}>
        <DynamicVisualCard watch={watch} />

        <CardNumberInput register={register} errors={errors} />

        <div className="flex gap-4 justify-between">
          <ExpiryDateInput register={register} errors={errors} />

          <CvvInput register={register} errors={errors} />
        </div>

        {status.code === 400 && <span className="text-red-400 text-center mt-5">{status.message}</span>}

        <input
          className={`${status.code === 200 ? "bg-green-500 cursor-not-allowed" : "bg-blue-700 cursor-pointer"} w-full py-4 mb-4 text-white font-bold rounded mt-auto shadow-md hover:bg-blue-500 transition-all`}
          type="submit"
          value={status.code === 200 ? status.message : "Submit"}
          disabled={status.code === 200}
          />
      </form>
    </>
  )
}
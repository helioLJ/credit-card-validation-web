import { UseFormWatch } from "react-hook-form";
import { identifyCardIssuer } from "../utils/IdentifyCardIssuer";
import { FormInputs } from "../types";

interface DynamicVisualCardProps {
    watch: UseFormWatch<FormInputs>
}

export function DynamicVisualCard({ watch }: DynamicVisualCardProps) {
    return (
    <div className="bg-cc-bg bg-cover rounded-2xl p-7 text-white flex flex-col justify-between h-[200px] w-[360px] absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center">
          <p>{watch("cvv") ? watch("cvv") : "123"}</p> 
          <img className="w-16 h-16" src={"src/assets/" + identifyCardIssuer(watch("cardNumber", "0")) + ".svg"} alt="Credit Card Issuer" />
        </div>

        <div className="flex justify-between items-center">
          <p>{watch("cardNumber") ? watch("cardNumber") : "0000000000000000"}</p>
          <p>{watch("expiryDate") ? watch("expiryDate") : "00/00"}</p>
        </div>
      </div>
    )
}
import { TEXTS } from "@/constants";

import { Spinner } from "./Spinner";

interface ResultBoxProps {
  total?: number;
  totalWithDiscount?: number;
}

export const ResultBox = ({ total, totalWithDiscount }: ResultBoxProps) => {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 mt-4 w-full lg:w-72 flex flex-col gap-2">
      <div className="flex justify-between text-sm font-medium text-gray-600">
        <p>{TEXTS.total}</p>
        <span>{total ? total : <Spinner />}</span>
      </div>
      <div className="flex justify-between text-base font-bold text-blue-500">
        <p>{TEXTS.totalWithDiscount}</p>
        <span>{totalWithDiscount ? totalWithDiscount : <Spinner />}</span>
      </div>
    </div>
  );
};

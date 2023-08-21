import useSWR from "swr";

import { ProductsData } from "@/app/api/types";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw Error("Error occured when retrieving products data");
  }

  const data: { data: ProductsData } = await res.json();

  return data;
};

export const useGetAllProducts = () => {
  const { data, error, isLoading } = useSWR(`/api/products/`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};

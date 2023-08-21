import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw Error("Error occured when retrieving products pricing data");
  }

  const data: { data: { id: string; name: string; price: number }[] } =
    await res.json();

  return data;
};

export const useGetProductsPricing = (year: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/products?year=${year}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};

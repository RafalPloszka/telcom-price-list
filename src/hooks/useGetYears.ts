import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw Error("Error occured when retrieving years data");
  }

  const data: { data: string[] } = await res.json();

  return data;
};

export const useGetYears = () => {
  const { data, error, isLoading } = useSWR(`/api/years`, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
};

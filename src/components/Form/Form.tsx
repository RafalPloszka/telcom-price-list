"use client";
import { ErrorMessage } from "@hookform/error-message";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Skeleton } from "@/components/Skeleton";
import { TEXTS } from "@/constants";

import { useGetAllProducts } from "../../hooks/useGetAllProducts";
import { useGetYears } from "../../hooks/useGetYears";
import { Spinner } from "../Spinner";
import { FormProps, FormValues } from "./Form.types";

export const Form = ({ setTotal, setTotalWithDiscount }: FormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      products: [],
    },
  });
  const { data: yearsData, isLoading: isYearsLoading } = useGetYears();
  const { data: productsData, isLoading: isProductsLoading } =
    useGetAllProducts();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data: FormValues) => {
      const params = new URLSearchParams();
      params.append("year", data.year);
      data.products.forEach((id) => params.append("products", id));

      const paramsString = params.toString();

      const response = await fetch(`/api/productsPricing?${paramsString}`);
      const responseJson = await response.json();

      setTotal(responseJson.totalPrice);
      setTotalWithDiscount(responseJson.bestOffer);
    },
    [setTotal, setTotalWithDiscount]
  );

  return (
    <form
      className="flex flex-col mb-8 w-full lg:w-64"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-3xl mb-8">
        <label
          htmlFor="year"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {TEXTS.pickYear}
        </label>
        {isYearsLoading ? (
          <Skeleton itemHeight="lg" />
        ) : (
          <select
            id="year"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("year")}
          >
            {yearsData?.data.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="w-3xl mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {TEXTS.pickProducts}
        </label>

        {isProductsLoading ? (
          <Skeleton itemHeight="md" count={4} />
        ) : (
          <div className="flex flex-col mb-4">
            {productsData?.data.map((product) => (
              <div key={product.id} className="flex my-2">
                <label className="flex items-center text-md font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                  <input
                    id="product"
                    type="checkbox"
                    value={product.id}
                    {...register("products", {
                      required: TEXTS.productsRequired,
                      validate: () => {
                        if (product.validationRule) {
                          if (
                            getValues("products").includes(product.id) &&
                            !getValues("products").includes(
                              product.validationRule.requiredWith
                            )
                          ) {
                            return product.validationRule.errorMessage;
                          }
                        }
                      },
                    })}
                    className="w-4 h-4 mr-2 text-blue-400 bg-gray-100 border-gray-300 rounded dark:focus:ring-blue-400 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                  />
                  {product.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!isDirty || !isValid}
        className="text-white bg-blue-500 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 disabled:bg-blue-200 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {isSubmitting ? <Spinner /> : TEXTS.submitButtonLabel}
      </button>

      <ErrorMessage
        errors={errors}
        name="products"
        render={({ message }) => (
          <p className="w-full text-sm text-red-500 my-4">{message}</p>
        )}
      />
    </form>
  );
};

function getValidationRules() {}

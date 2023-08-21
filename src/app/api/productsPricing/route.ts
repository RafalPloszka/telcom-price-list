import difference from "lodash.difference";
import intersection from "lodash.intersection";
import { NextResponse } from "next/server";

import data from "../../data.json";
import { Discount, ProductsPricing, SingleProductPricing } from "../types";

const productsPricing: ProductsPricing = data;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year") ?? "";
  const productIds = searchParams.getAll("products") ?? [];

  const pricingByYear = productsPricing[year].products;

  const selectedProducts = pricingByYear.filter((product) =>
    productIds.includes(product.id)
  );

  const totalPrice = selectedProducts.reduce(
    (acc, current) => acc + current.price,
    0
  );

  const selectedProductsIds = selectedProducts.map((product) => product.id);

  const offers = [totalPrice];

  const discountsByYear = productsPricing[year].discounts;

  // Filter discounts which can be applied to selected products
  const relevantDiscounts =
    discountsByYear?.filter((discount) => {
      return discount.productIds.every((id) =>
        selectedProductsIds.includes(id)
      );
    }) ?? [];

  const offersWithDiscounts =
    selectDiscount(
      selectedProductsIds,
      pricingByYear,
      relevantDiscounts,
      offers
    ) ?? [];

  // Select the offer with the lowest price
  const bestOffer = Math.min(...offersWithDiscounts);

  return NextResponse.json({ totalPrice, bestOffer });
}

function selectDiscount(
  productIds: string[],
  productsPricing: SingleProductPricing[],
  discounts: Discount[],
  offers: number[],
  singleOffer?: number
) {
  if (productIds?.length === 0) {
    // If function is called recursively, add previuosly calculated value to offers array
    if (singleOffer) {
      offers?.push(singleOffer);
    }
    return offers;
  }

  // If no discount can be applied, use regular prices for all products
  if (discounts.length === 0) {
    const selectedProducts = productsPricing.filter((product) =>
      productIds.includes(product.id)
    );

    const totalPriceWithouDiscounts = selectedProducts.reduce(
      (acc, current) => acc + current.price,
      0
    );

    // If function is called recursively, add calculated value to the offer passed in arguments
    if (singleOffer) {
      singleOffer += totalPriceWithouDiscounts;
    }

    offers?.push(singleOffer ?? totalPriceWithouDiscounts);

    return offers;
  }

  discounts?.forEach((discount) => {
    // For each relevant discount create a new offer = 0
    // or use previously calculated value if function is called recursively
    let offer = singleOffer ?? 0;

    offer += discount.value;

    // Remove products included in discounts from the productsIds array
    const restOfProducts = difference(
      productIds,
      intersection(productIds, discount.productIds)
    );

    // Recalculate discounts for the new productsId array
    const relevantDiscounts = discounts?.filter((discount) => {
      return discount.productIds.every((id) => restOfProducts.includes(id));
    });

    selectDiscount(
      restOfProducts,
      productsPricing,
      relevantDiscounts,
      offers,
      offer
    );
  });

  return offers;
}

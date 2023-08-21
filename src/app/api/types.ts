export type Id = string;

export type SingleProductPricing = {
  id: Id;
  name: string;
  price: number;
  discounts?: Discount[];
};

export type Discount = {
  id: Id;
  name: string;
  productIds: Id[];
  value: number;
};

export type ProductsPricing = Record<
  string,
  { products: SingleProductPricing[]; discounts?: Discount[] }
>;

export type ProductsData = {
  id: string;
  name: string;
  validationRule?: {
    requiredWith: string;
    errorMessage: string;
  };
}[];

export type YearsData = string[];

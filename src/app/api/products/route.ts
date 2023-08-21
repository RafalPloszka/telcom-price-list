import { NextResponse } from "next/server";

import { ProductsData } from "../types";

export async function GET() {
  // mocked data
  const data: ProductsData = [
    {
      id: "1",
      name: "Internet",
    },
    {
      id: "2",
      name: "Telewizja",
    },
    {
      id: "3",
      name: "Abonament telefoniczny",
    },
    {
      id: "4",
      name: "Dekoder 4K",
      validationRule: {
        requiredWith: "2",
        errorMessage: "Dobierz usługę telewizji do dekodera",
      },
    },
  ];

  return NextResponse.json({ data });
}

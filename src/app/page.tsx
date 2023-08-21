"use client";
import React, { useState } from "react";

import { Form } from "@/components/Form/Form";
import { Header } from "@/components/Header";
import { ResultBox } from "@/components/ResultBox";

export default function Home() {
  const [total, setTotal] = useState<number>();
  const [totalWithDiscount, setTotalWithDiscount] = useState<number>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 lg:p-24">
      <div className="z-10  w-full items-center justify-center text-sm flex flex-col bg-white py-8 px-6 rounded-md lg:max-w-5xl">
        <Header />
        <Form setTotal={setTotal} setTotalWithDiscount={setTotalWithDiscount} />
        {total && totalWithDiscount && (
          <ResultBox total={total} totalWithDiscount={totalWithDiscount} />
        )}
      </div>
    </main>
  );
}

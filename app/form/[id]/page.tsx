'use server';

import dynamic from "next/dynamic";
import React from "react";

const DynamicFormView = dynamic(
  () => import("@/components/View"),
  { ssr: false }
);


const FormView = async({ params }: { params: { id: string } }) => {
  console.log(params.id)
  return (
    <div>
      <DynamicFormView params={params.id} />
    </div>
  );
};

export default FormView;
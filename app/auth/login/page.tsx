import React, { Suspense } from "react";
import SigninForm from "../../../components/form/SigninForm";

const page = () => {
  return (
    <div>
      <Suspense>
        <SigninForm />
      </Suspense>
    </div>
  );
};

export default page;

// import React, { Suspense } from "react";

// export const LazyWrapper = ({
//   children
// }) => <Suspense>{children}</Suspense>;
import { Suspense } from "react";

export const LazyWrapper = ({ children }) => {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
};
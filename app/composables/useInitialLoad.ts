import { useState } from "#app";

export const useInitialLoad = () => {
  const isInitialLoadComplete = useState(
    "sh-initial-load-complete",
    () => false,
  );

  return {
    isInitialLoadComplete,
  };
};

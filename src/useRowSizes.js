import { useCallback, useState } from "react";

export const useRowSizes = (rowsCount, defaultSize, listRef) => {
  const [rowSizes, setRowSizes] = useState(() =>
    new Array(rowsCount).fill(defaultSize)
  );

  const getRowSize = useCallback(
    (rowIndex) => {
      return rowSizes[rowIndex];
    },
    [rowSizes]
  );

  const setRowSize = useCallback(
    (rowIndex, sizeNew) => {
      setRowSizes((prev) => {
        return prev.map((size, index) => {
          if (index !== rowIndex) return size;

          return sizeNew;
        });
      });

      if (listRef.current) {
        listRef.current.resetAfterIndex(rowIndex);
      }
    },
    [listRef]
  );

  return [getRowSize, setRowSize];
};

import React, { useCallback } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { Table } from "./Table";

export const TableSized = () => {
  const renderTable = useCallback(
    ({ height, width }) => <Table height={height} width={width} />,
    []
  );

  return <AutoSizer>{renderTable}</AutoSizer>;
};

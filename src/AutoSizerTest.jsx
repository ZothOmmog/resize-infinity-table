import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export const ListSized = forwardRef(({ onItemsRendered, children }, ref) => {
  console.log("render");
  return (
    <div style={{ height: "100%" }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={1000}
            itemSize={35}
            width={width}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {children}
          </List>
        )}
      </AutoSizer>
    </div>
  );
});

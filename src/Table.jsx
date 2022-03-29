// import { useStore } from "effector-react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
// import { $width, widthChanged } from "./model";
import "./styles.css";
// import { usePrevious } from "./usePrevious";
import { useRowSizes } from "./useRowSizes";

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

const isItemLoaded = (index) => !!itemStatusMap[index];
const loadMoreItems = (startIndex, stopIndex) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADING;
  }
  return new Promise((resolve) =>
    setTimeout(() => {
      for (let index = startIndex; index <= stopIndex; index++) {
        itemStatusMap[index] = LOADED;
      }
      resolve();
    }, 1_000)
  );
};

const Row = memo((props) => {
  const { index, style, setRowSize, defaultHeight } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const [rowRef, height] = useRowHeightBasedOnWidth(defaultHeight);
  const mount = useRef(false);

  const subContent = new Array((index + 1) * 10).fill("sub content").join(" ");

  useEffect(() => () => setRowSize(index, defaultHeight), [
    setRowSize,
    index,
    defaultHeight
  ]);

  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
      return;
    }

    setRowSize(index, height);
  }, [rowRef, index, height, setRowSize]);

  let label;

  if (itemStatusMap[index] === LOADED) {
    label = `Row ${index}`;
  } else {
    label = "Loading...";
  }

  const handleExpand = () => {
    if (itemStatusMap[index] === LOADING) return;

    if (isExpanded) setIsExpanded(false);
    else setIsExpanded(true);
  };

  return (
    <div className="ListItem" style={style} onClick={handleExpand}>
      <div style={{ minHeight: 30 }} ref={rowRef}>
        {label} label label label label label
        {isExpanded ? (
          <div style={{ paddingLeft: 12 }}>
            <hr />
            {subContent}
            <hr />
          </div>
        ) : null}
      </div>
    </div>
  );
});

const useRowHeightBasedOnWidth = (defaultHeight) => {
  const resizeObserver = useRef(null);

  const [height, setHeight] = useState(defaultHeight);

  useEffect(() => () => resizeObserver.current.disconnect(), []);

  const rowRef = useCallback(
    (elem) => {
      if (elem === null) return;
      if (resizeObserver.current !== null) return;

      resizeObserver.current = new ResizeObserver(([elem]) => {
        const heightNew = elem.target.offsetHeight;
        if (heightNew === height) return;
        setHeight(heightNew);
      });

      resizeObserver.current.observe(elem);
    },
    [setHeight, height]
  );

  return [rowRef, height];
};

export const Table = ({ height, width, defaultRowHeight = 30 }) => {
  const listRef = useRef(null);
  const [getRowSize, setRowSize] = useRowSizes(
    10000,
    defaultRowHeight,
    listRef
  );

  const renderRow = useCallback(
    (props) => (
      <Row
        {...props}
        setRowSize={setRowSize}
        defaultHeight={defaultRowHeight}
      />
    ),
    [setRowSize, defaultRowHeight]
  );

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={10000}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => {
        return (
          <List
            className="List"
            height={height}
            itemCount={10000}
            itemSize={getRowSize}
            onItemsRendered={onItemsRendered}
            ref={(elem) => {
              ref(elem);
              listRef.current = elem;
            }}
            width={width}
          >
            {renderRow}
          </List>
        );
      }}
    </InfiniteLoader>
  );
};

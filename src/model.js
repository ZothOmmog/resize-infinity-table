// import { createEffect, createStore } from "effector";

import { createEvent, createStore, forward } from "effector";

// const $data = createStore(new Array(1000).fill(null).map((_, id) => ({ id })));

// const fetchNextDataFx = createEffect((startIndex, stopIndex) => {
//   for (let index = startIndex; index <= stopIndex; index++) {
//     itemStatusMap[index] = LOADING;
//   }
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       for (let index = startIndex; index <= stopIndex; index++) {
//         itemStatusMap[index] = LOADED;
//       }
//       resolve();
//     }, 1_000)
//   );
// });

export const $width = createStore(null);
export const widthChanged = createEvent();

forward({
  from: widthChanged,
  to: $width
});

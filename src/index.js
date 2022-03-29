import React from "react";
import { render } from "react-dom";

import { TableSized } from "./TableSized";

// import "./styles.css";
const rootElement = document.getElementById("root");
render(
  <div style={{ height: "90vh" }}>
    <TableSized />
  </div>,
  rootElement
);

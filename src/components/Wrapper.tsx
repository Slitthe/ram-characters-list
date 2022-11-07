import React from "react";

export default function Wrapper(props: any) {
    console.log(props);
  return (
    <button style={{ border: "2px solid blue" }}>
     {props.children}
    </button>
  );
}

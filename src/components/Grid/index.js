import React from "react";

//container using bootstrap
export function Container({ fluid, children }) {
    return <div id="container" className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}


//row using bootstrap
export function Row({ fluid, children }) {
    return <div className={`row${fluid ? "-fluid" : ""}`}>{children}</div>;
}


//column using bootstrap
export function Col({ size, children }) {
    return (
        <div
            className={size
                .split(" ")
                .map(size => "col-" + size)
                .join(" ")}
        >{children}</div>
    );
}
import Image from "next/image";
import React from "react";

export const Hexagon: React.FC = () => {
  const n_rows = 3;
  const n_cols_min = 2;
  const n_cols_max = n_cols_min + 1;
  const n_cols_sum = n_cols_max + n_cols_min;

  const imgs = [
    "https://res.cloudinary.com/dcoqmeswp/image/upload/v1751375904/tt1m98eaghyhjxd9fbmf.jpg",
    "https://res.cloudinary.com/dcoqmeswp/image/upload/v1751356969/do1l9bzrywtczldas7qe.jpg",
    "http://res.cloudinary.com/dcoqmeswp/image/upload/v1750700034/gk0p6dhicebjw00si91u.jpg",
    "https://res.cloudinary.com/dcoqmeswp/image/upload/v1751375467/dyro6yjjaalpnt0pwos2.jpg",
    "http://res.cloudinary.com/dcoqmeswp/image/upload/v1750689523/noxpbfsgwl6xr8rk9e1q.jpg",
    "http://res.cloudinary.com/dcoqmeswp/image/upload/v1750689442/sijydphgl5lwnown4iz9.jpg",
    "http://res.cloudinary.com/dcoqmeswp/image/upload/v1750700909/qhozkgxahnhrtdqixqe3.jpg",
  ];

  const ni = imgs.length;
  const n =
    Math.ceil(0.5 * n_rows) * n_cols_min +
    Math.floor(0.5 * n_rows) * n_cols_max;

  return (
    <div
      className="hex-grid-body"
      style={
        {
          "--n-rows": n_rows,
          "--n-cols": 2 * n_cols_max,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="hex-cell"
          style={
            (i % n_cols_sum === 0
              ? { gridColumnStart: 2 }
              : {}) as React.CSSProperties
          }
        >
          <Image
            src={imgs[i % ni]}
            alt={`hex-${i}`}
            width={500} // Required
            height={400}
          />
        </div>
      ))}
    </div>
  );
};

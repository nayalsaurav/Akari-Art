import Image from "next/image";
import React from "react";

export const Hexagon: React.FC = () => {
  const n_rows = 3;
  const n_cols_min = 2;
  const n_cols_max = n_cols_min + 1;
  const n_cols_sum = n_cols_max + n_cols_min;

  const imgs = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=650&fm=jpg",
    "https://images.unsplash.com/photo-1497733942558-e74c87ef89db?w=650&fm=jpg",
    "https://images.unsplash.com/photo-1540744276164-9dc898353c7b?w=650&fm=jpg",
    "https://images.unsplash.com/photo-1469975692758-66d107a536cb?w=650&fm=jpg",
    "https://images.unsplash.com/photo-1490845060161-85f9ce08a9f4?w=650&fm=jpg",
    "https://images.unsplash.com/photo-1541673504494-8bcc1a340180?w=650&fm=jpg",
    "https://images.unsplash.com/photo-1515937350506-3e7b51a95339?w=650&fm=jpg",
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

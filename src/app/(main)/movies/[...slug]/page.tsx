import React from "react";

interface MovieDetailProps {
  params: {
    slug: string;
  };
}

export default function MoviesPage({ params }: MovieDetailProps) {
  const { slug } = params;
  return <div className="">{slug}</div>;
}

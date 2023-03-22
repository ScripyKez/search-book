import React from "react";
import Select from "react-select";

export default function MySelect({ refy }) {
  const options = [
    { value: "relevance", label: "Relevance" },
    { value: "newest", label: "Newest" },
  ];
  return <Select placeholder="Privet" defaultValue={options[0]} ref={refy} options={options} />;
}

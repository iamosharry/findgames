import React from "react";

interface SelectedContextType {
  selected: boolean;
  setSelected: (event: boolean) => void;
}

const selectContext = React.createContext<SelectedContextType>(
  {} as SelectedContextType
);

export default selectContext;

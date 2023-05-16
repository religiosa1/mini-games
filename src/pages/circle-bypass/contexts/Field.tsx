import { createContext, useContext, JSX } from "solid-js";
import { PolarField } from "../models/PolarField";

const FieldContext = createContext<PolarField>(new PolarField(1000));

interface FieldProviderProps {
  field?: PolarField;
  children?: JSX.Element;
}
export function FieldProvider(props: FieldProviderProps) {
  const field = props.field || new PolarField(1000);

  return (
    <FieldContext.Provider value={field}>
      {props.children}
    </FieldContext.Provider>
  );
}

export function useField() { return useContext(FieldContext); }
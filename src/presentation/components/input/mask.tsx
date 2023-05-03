import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";


interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        allowLeadingZeros 
        thousandSeparator="," 
        decimalScale={2} 
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        prefix="$"
      />
    );
  },
);
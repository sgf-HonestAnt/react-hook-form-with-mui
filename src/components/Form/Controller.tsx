import { Control, Controller } from "react-hook-form";
import RadioButtonsComponent from "./RadioButtons";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "./styledMuiComponents";
import { FormField, FormFieldTypes, Option } from "./types";

type Props = {
  field: FormField;
  control: Control;
};

function GenericController({ field, control }: Props) {
  const label = `${field.label}`;
  const variant =
    field.type !== FormFieldTypes.RADIO
      ? field.typeVariant ?? "standard"
      : undefined;
  const rows =
    field.type !== FormFieldTypes.RADIO ? field.rows ?? 1 : undefined;
  const multiline =
    field.type !== FormFieldTypes.RADIO ? field.multiline ?? false : undefined;
  switch (field.type) {
    case FormFieldTypes.INPUT:
      return (
        <Controller
          name={field.id}
          control={control}
          rules={field.rules}
          defaultValue={field.defaultValue ?? ""}
          render={({ field: { ref, ...field } }) => {
            return (
              <TextField
                variant={variant}
                inputRef={ref}
                label={label}
                rows={rows}
                multiline={multiline}
                {...field}
              />
            );
          }}
        />
      );
    case FormFieldTypes.SELECT:
      const options = field.options;
      return (
        <Controller
          name={field.id}
          control={control}
          rules={field.rules}
          defaultValue={field.defaultValue ?? ""}
          render={({ field: { ref, ...field } }) => {
            return (
              <>
                <InputLabel>{label}</InputLabel>
                <FormControl>
                  <Select
                    variant={variant}
                    inputRef={ref}
                    rows={rows}
                    multiline={multiline}
                    {...field}>
                    {options?.map((option: Option, idx: number) => {
                      return (
                        <MenuItem
                          key={`form-field-option-${idx + 1}`}
                          value={option.value}>
                          {option.copy}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </>
            );
          }}
        />
      );
    case FormFieldTypes.RADIO:
      const buttons = field.buttons;
      const config = field.config;
      return (
        <Controller
          name={field.id}
          control={control}
          rules={field.rules}
          defaultValue={field.defaultValue ?? ""}
          render={({ field: { ref, ...field } }) => (
            <RadioButtonsComponent
              {...field}
              label={label}
              buttons={buttons}
              config={config}
            />
          )}
        />
      );
  }
}

export default GenericController;

import React, { useState, useMemo, useEffect } from "react";
import PropType from "prop-types";
import { TextField, FormControl, Button, capitalize } from "@material-ui/core";
import { useFormStyles } from "./styles";

const FormWithValidation = ({
  submitButtonLabel = "OK",
  title = "",
  fieldsOptionsMap,
  onSubmit,
  errors,
}) => {
  const styles = useFormStyles();
  const fieldsKeys = useMemo(() => Object.keys(fieldsOptionsMap), [
    fieldsOptionsMap,
  ]);

  const getEmptyFieldsMap = () =>
    fieldsKeys.reduce((acc, key) => ({ ...acc, [key]: "" }), {});

  const [fieldsValuesMap, setFieldsValuesMap] = useState(getEmptyFieldsMap());
  const [errorsMap, setErrorsMap] = useState(getEmptyFieldsMap());

  const updatePrevStateObj = (setFn, key, value) =>
    setFn((prev) => ({ ...prev, [key]: value }));

  const setFieldValue = (key, value) =>
    updatePrevStateObj(setFieldsValuesMap, key, value);
  const setErrorValue = (key, value) =>
    updatePrevStateObj(setErrorsMap, key, value);

  const handleTextInputChange = (e, key) => {
    e.preventDefault();
    setFieldValue(key, e.target.value);
    setErrorsMap(getEmptyFieldsMap());
  };

  useEffect(() => {
    setErrorsMap((prev) => ({ ...prev, ...errors }));
  }, [errors]);

  const getFormErrorsCount = () => {
    let count = 0;
    fieldsKeys.forEach((key) => {
      const validate = fieldsOptionsMap[key].validator;
      const currentValue = fieldsValuesMap[key];
      if (!validate) return;
      const errorText = validate(currentValue);
      if (errorText) count++;
      setErrorValue(key, errorText);
    });
    return count;
  };

  const handleClick = () => {
    if (getFormErrorsCount() > 0) return;
    if (onSubmit) onSubmit(fieldsValuesMap);
  };

  const getCustomPropsForInput = (key) =>
    fieldsOptionsMap[key] && fieldsOptionsMap[key].props
      ? fieldsOptionsMap[key].props
      : {};

  return (
    <FormControl className={styles.form}>
      {title && (
        <div className={styles.header}>
          <h2>{title}</h2>
        </div>
      )}
      <div className={styles.body}>
        {fieldsKeys.map((key) => (
          <TextField
            key={key}
            className={styles.input}
            variant="outlined"
            label={errorsMap[key] || capitalize(key)}
            value={fieldsValuesMap[key]}
            onChange={(e) => handleTextInputChange(e, key)}
            error={!!errorsMap[key]}
            {...getCustomPropsForInput(key)}
          />
        ))}
        <Button
          className={styles.input}
          variant="outlined"
          onClick={handleClick}
        >
          {submitButtonLabel}
        </Button>
      </div>
    </FormControl>
  );
};

FormWithValidation.propTypes = {
  submitButtonLabel: PropType.string,
  title: PropType.string,
  fieldsOptionsMap: PropType.object,
  onSubmit: PropType.func,
  errors: PropType.object,
};

export default FormWithValidation;

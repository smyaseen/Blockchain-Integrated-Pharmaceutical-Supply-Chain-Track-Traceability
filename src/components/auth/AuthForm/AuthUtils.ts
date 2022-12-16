import { FieldProp } from './AuthTypes';

export const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]+$/;
export const passwordRegex =
  /^(.*(([A-Za-z]+(.*)[0-9]+)|([0-9]+(.*)[A-Za-z]+))(.*))$/;

export const fieldChangeHandler = (
  prev: Array<FieldProp>,
  value: string,
  index: number
) => {
  const prevForm = [...prev];
  const currentTextField = prevForm[index];

  currentTextField.value = value;
  if (currentTextField.value !== '') {
    currentTextField.errorMessage = '';
  }

  if (currentTextField.getValidation) {
    const getValidationError = currentTextField.getValidation(
      currentTextField.value
    );
    currentTextField.errorMessage = getValidationError;
  }

  return prevForm;
};

export const SelectChangeHandler = (
  prev: Array<FieldProp>,
  values: [string],
  index: number
) => {
  const prevForm = [...prev];
  const currentTextField = prevForm[index];

  currentTextField.values = values;

  if (currentTextField.getValidation) {
    const getValidationError = currentTextField.getValidation(
      currentTextField.value
    );
    currentTextField.errorMessage = getValidationError;
  }

  return prevForm;
};

export const validateOnSubmit = (
  fields: Array<FieldProp>,
  checkEmpty: boolean
) => {
  let isValid = true;
  const validateArray = fields.map((field) => {
    if (!(field.value?.length || field.value) && checkEmpty) {
      isValid = false;
      const { label = '' } = field;

      return {
        ...field,
        errorMessage: `${
          label.charAt(0).toUpperCase() + label.slice(1)
        } field cannot be empty`,
      };
    }
    if (field.errorMessage !== '') {
      isValid = false;
      return field;
    }
    return {
      ...field,
      errorMessage: '',
    };
  });

  return { validateArray, isValid };
};

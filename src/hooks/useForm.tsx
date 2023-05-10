import { useState } from "react";


const useForm = <T extends Object>( form: T) => {

  interface UseFormChangeSchema {
    value: any;
    field: keyof T
  }

  const [state, setState] = useState(form);
  
  const onChange = async ( value: any, field: keyof T) => {
    await setState({
      ...state,
      [field]: value,
    });
  };

  const onMultipleChange = async (newData: UseFormChangeSchema[]) => {
    let newState = {... state};

    for(const propData of newData) {
      newState = {
        ...newState,
        [propData.field]: propData.value,
      }
    }

    await setState(newState);
  }

  const validFields = (): any => {
    let newErrors: any = {};
    Object.entries(state).forEach(([key, value]: any) => {
      if (!value || value === null || value === '') {
        newErrors = {
          ...newErrors,
          [key]: true,
        };
      }
    });
    return newErrors;
  };

  return {
    form: state,
    onChange,
    validFields,
    onMultipleChange
  };
};

export default useForm;

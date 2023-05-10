import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { SelectProps } from 'antd/es/select';

import './InputSearch.scss';

interface InputSearchI {
    searchResult: (value: string) => any[];
    onClick: (value: string) => void;
}
const InputSearch = ({ searchResult, onClick }: InputSearchI) => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const handleSearch = (value: string) => {
      setOptions(value ? searchResult(value) : []);
  };

  const inputOnSearch = (value: string) => {
    onClick(value);
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      className="autocomplete"
      options={options}
      onSearch={handleSearch}
    >
      <Input.Search size="large" placeholder="Nunca dejes de buscar..." onSearch={inputOnSearch} />
    </AutoComplete>
  );
};

export default InputSearch;
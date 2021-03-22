import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

const SearchBar = (props) => {
  const { enterButtonText, placeholderText, onSearch, style } = props;
  return (
    <Search
      placeholder={placeholderText}
      allowClear
      enterButton={enterButtonText}
      size="large"
      onSearch={onSearch}
      style={style || {}}
    />
  );
};

export default SearchBar;

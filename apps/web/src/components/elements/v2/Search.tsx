import { useCallback, useState, ChangeEvent } from 'react';
import { Flex } from '../../grids/v4';

import './Search.scss';

interface SearchProps {
  on_search: (value: string) => void;
}

const Search = ({ on_search }: SearchProps) => {
  const [search, set_search] = useState('');

  const on_change = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    on_search(event.target.value);
    set_search(event.target.value);
  }, [on_search]);

  return (
    <Flex.Item direction={Flex.H} class_name="search-container">
      <input
        className="search-input-text-box"
        type="text"
        autoFocus
        placeholder="Buscador"
        value={search}
        onChange={on_change}
      />
    </Flex.Item>
  );
};

export { Search };

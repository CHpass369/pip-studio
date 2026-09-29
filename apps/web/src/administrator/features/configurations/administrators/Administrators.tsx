import React from 'react';

import { WLinearListOption } from 'components/lists/v1';
import { Administrator } from './Administrator';
import { AdministratorAccount } from 'administrator/models/administrator.model';

interface AdministratorsProps {
  items: AdministratorAccount[];
  on_remove: (item: AdministratorAccount) => void;
}

const Administrators = ({ items, on_remove }: AdministratorsProps) => {
  const render_item = (item: AdministratorAccount) => (
    <Administrator key={item._id} item={item} on_remove={on_remove} />
  );

  return (
    <WLinearListOption>
      {items.map((item) => render_item(item))}
    </WLinearListOption>
  );
};

export { Administrators };

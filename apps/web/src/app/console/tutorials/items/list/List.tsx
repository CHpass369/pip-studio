
import { ListItem } from './ListItem';

import './List.scss';

interface ListProps {
  items: any[];
}

const List = ({ items }: ListProps) => {
  if (!items) {
    throw new Error('items is undefined');
  }

  const render_item = (item: any) => (
    <ListItem key={item._id} item={item} />
  );

  return (
    <div className="tutorials-list">
      {items.map(render_item)}
    </div>
  );
};



export { List };

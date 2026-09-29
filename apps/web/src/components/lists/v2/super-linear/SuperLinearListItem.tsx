import classnames from 'classnames';

import './SuperLinearListItem.scss';

const SuperLinearListItem = ({ current, item, on_select }) => {
  const class_names = { 'list-item-select': current && current._id === item._id };

  const onClick = (e: any) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <div
      className={classnames('list-item', 'super-linear-list-item', class_names)}
      onClick={onClick}
    >
      <h2>
        {item.name}
      </h2>
    </div>
  );
};

export { SuperLinearListItem };

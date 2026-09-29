import classnames from 'classnames';

import './LinearListItem.scss';

const LinearListItem = ({ current, item, on_select }) => {
  const class_names = { 'list-item-select': current && current._id === item._id };

  const onClick = (e: any) => {
    e.stopPropagation();
    on_select(item);
  };

  return (
    <div
      className={classnames('list-item', 'linear-list-item', class_names)}
      onClick={onClick}
    >
      <h2>
        {item.name}
      </h2>
      <p>
        {item.description}
      </p>
    </div>
  );
};

export { LinearListItem };

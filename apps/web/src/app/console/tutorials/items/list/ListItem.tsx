
interface ListItemProps {
  item: any;
}

const ListItem = ({ item }: ListItemProps) => {
  if (!item) {
    throw new Error('item is undefined');
  }

  return (
    <div className="tutorials-list-item">
      <video className="tutorials-list-item-video" src={item.video} controls={true} preload="metadata" />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
};



export { ListItem };

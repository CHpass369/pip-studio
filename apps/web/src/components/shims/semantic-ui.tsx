import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListIcon from '@mui/icons-material/List';
import CircleIcon from '@mui/icons-material/Circle';

const ICON_MAP = {
  cancel: CloseIcon,
  remove: CloseIcon,
  'remove circle': CloseIcon,
  checkmark: CheckIcon,
  edit: EditIcon,
  'edit outline': EditIcon,
  delete: DeleteIcon,
  search: SearchIcon,
  home: HomeIcon,
  users: GroupIcon,
  group: GroupIcon,
  like: ThumbUpIcon,
  'like outline': ThumbUpIcon,
  'ellipsis vertical': MoreVertIcon,
  list: ListIcon,
  circle: CircleIcon,
};

const Icon = ({ name, ...props }) => {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) return null;
  return <IconComponent fontSize="small" {...props} />;
};

const Form = ({ children, onSubmit, inverted, ...props }) => (
  <form
    className="ui form"
    onSubmit={(e: any) => { if (onSubmit) { e.preventDefault(); onSubmit(e); } }}
    {...props}
  >
    {children}
  </form>
);
const FormField = ({ children, ...props }) => <div className="field" {...props}>{children}</div>;
const FormGroup = ({ children, ...props }) => <div className="fields" style={{ display: 'flex', gap: '1rem' }} {...props}>{children}</div>;
Form.Field = FormField;
Form.Group = FormGroup;

const List = ({ children, ...props }) => <div className="list" {...props}>{children}</div>;
const ListItem = ({ children, onClick, ...props }) => <div className="item" onClick={onClick} {...props}>{children}</div>;
const ListIconItem = ({ name, ...props }) => <Icon name={name} {...props} />;
List.Item = ListItem;
List.Icon = ListIconItem;

const Statistic = ({ label, value, ...props }) => (
  <div className="statistic" {...props}>
    <div className="value">{value}</div>
    <div className="label">{label}</div>
  </div>
);

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 320,
  maxWidth: '90vw',
  maxHeight: '85vh',
  overflow: 'auto',
  background: '#2b2b2b',
  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  padding: '1.5rem',
};

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1300 }} onClick={onClose}>
      <div style={modalStyle} onClick={(e: any) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
Modal.Header = ({ children }) => <h3>{children}</h3>;
Modal.Content = ({ children }) => <div className="modal-content">{children}</div>;
Modal.Actions = ({ children }) => <div className="modal-actions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>{children}</div>;

const Grid = ({ children, ...props }) => <div className="grid" style={{ display: 'flex', flexWrap: 'wrap' }} {...props}>{children}</div>;
Grid.Row = ({ children, ...props }) => <div className="row" style={{ display: 'flex', width: '100%' }} {...props}>{children}</div>;
Grid.Column = ({ children, width = 1, ...props }) => <div className="column" style={{ flex: width }} {...props}>{children}</div>;

const Header = ({ as: Tag = 'h2', children, textAlign, ...props }) => (
  <Tag style={{ textAlign }} {...props}>{children}</Tag>
);
Header.Content = ({ children }) => <div className="content">{children}</div>;
Header.Subheader = ({ children }) => <div className="sub header">{children}</div>;

const Input = ({ onChange, value, ...props }) => (
  <input
    value={value ?? ''}
    onChange={(e: any) => { if (onChange) onChange(e, { value: e.target.value, name: e.target.name, checked: e.target.checked }); }}
    {...props}
  />
);

const Checkbox = ({ onChange, checked, name, label, ...props }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <input
      type="checkbox"
      name={name}
      checked={checked || false}
      onChange={(e: any) => { if (onChange) onChange(e, { name, checked: e.target.checked, value: e.target.checked }); }}
      {...props}
    />
    {label}
  </label>
);

const Select = ({ onChange, value, options = [], placeholder, name, ...props }) => (
  <select
    name={name}
    value={value ?? ''}
    onChange={(e: any) => { if (onChange) onChange(e, { name, value: e.target.value }); }}
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.key ?? option.value} value={option.value}>{option.text}</option>
    ))}
  </select>
);

const Button = ({ children, content, positive, negative, secondary, color, fluid, basic, circular, onClick, type = 'button', ...props }) => (
  <button
    type={type}
    className="ui button"
    style={{
      background: positive ? '#21ba45' : negative ? '#db2828' : undefined,
      width: fluid ? '100%' : undefined,
    }}
    onClick={onClick}
    {...props}
  >
    {children ?? content}
  </button>
);
Button.Group = ({ children, ...props }) => <div className="buttons" style={{ display: 'flex', gap: '0.5rem' }} {...props}>{children}</div>;

const Search = ({ value, onSearchChange, onResultSelect, results = [], resultRenderer, placeholder, loading }) => {
  const [open, set_open] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <input
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e: any) => {
          set_open(true);
          if (onSearchChange) onSearchChange(e, { value: e.target.value });
        }}
      />
      {loading && <span>...</span>}
      {open && results.length > 0 && (
        <div style={{ position: 'absolute', zIndex: 10, background: '#2b2b2b', width: '100%', maxHeight: 240, overflow: 'auto' }}>
          {results.map((result, index) => (
            <div
              key={result._id || result.id || index}
              onClick={(e: any) => {
                set_open(false);
                if (onResultSelect) onResultSelect(e, { result });
              }}
              style={{ padding: '0.5rem', cursor: 'pointer' }}
            >
              {resultRenderer ? resultRenderer(result) : (result.title || result.name)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export {
  Form, Icon, List, Statistic, Modal, Grid, Header, Input, Checkbox, Select, Button, Search,
};

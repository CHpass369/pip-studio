import React from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';

import './VNavbar.scss';

const VNavbar = ({ link, links, on_select }) => {
  const navigate = useNavigate();
  const handle_select = (e, item) => {
    e.stopPropagation();
    on_select(item);
    navigate(item.uri);
  };

  const render_link = (link, index) => {
    let TempIcon;
    switch (link.icon) {
      case 'HomeIcon':
        TempIcon = HomeIcon;
        break;
      case 'EditIcon':
        TempIcon = EditIcon;
        break;
      case 'ImageIcon':
        TempIcon = ImageIcon;
        break;
      // case 'BalanceIcon':
      //   TempIcon = BalanceIcon;
        // break;
      default:
        TempIcon = HomeIcon;
        break;
    }

    return (
      <div
        key={link._id}
        className={classnames('navbar-item', { 'on-select active': link && link._id === link._id })}
        onClick={(e: any) => handle_select(e, link)}
      >
        {React.createElement(TempIcon)}
        <div className="icon-label">{link.label}</div>
      </div>
    );
  };

  return (
    <div className="navbar-list">
      {
        links.map(render_link)
      }
    </div>
  );
};

export { VNavbar };

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ListIcon from '@mui/icons-material/List';
import PercentIcon from '@mui/icons-material/Percent';
import SellIcon from '@mui/icons-material/Sell';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StraightenIcon from '@mui/icons-material/Straighten';

import './MenuIconList.scss';

interface MenuLink {
  _id?: string;
  icon: string;
  label: string;
  uri: string;
}

interface MenuIconListProps<T extends MenuLink> {
  links: T[];
  label?: boolean;
  on_select?: (link: T) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  shop: StorefrontIcon,
  list: ListIcon,
  tags: SellIcon,
  setting: SettingsIcon,
  home: HomeIcon,
  boxes: Inventory2Icon,
  box: ShoppingCartCheckoutIcon,
  gift: CardGiftcardIcon,
  'shopping cart': ShoppingCartIcon,
  'shopping basket': ShoppingBasketIcon,
  expand: StraightenIcon,
  percent: PercentIcon,
  'long arrow alternate up': ArrowUpwardIcon,
  'long arrow alternate down': ArrowDownwardIcon,
};

const MenuIconList = <T extends MenuLink>({ links, label = true, on_select }: MenuIconListProps<T>) => {
  const { point } = useSelector((state: any) => state.toolbar);
  const [selected, set_selected] = useState<MenuLink | null>(null);
  const navigate = useNavigate();

  const active_uri = on_select ? point?.uri : selected?.uri;

  const on_click = (link: T) => {
    if (on_select) {
      on_select(link);
      return;
    }
    set_selected(link);
    navigate(link.uri);
  };

  return (
    <div className="point-list">
      {
        links.map((link) => {
          const IconComponent = ICON_MAP[link.icon];
          const active = !!active_uri && link.uri === active_uri;

          return (
            <div
              key={link._id ?? link.uri}
              className={active ? 'point-list-item active' : 'point-list-item'}
              onClick={() => on_click(link)}
            >
              {IconComponent && <IconComponent fontSize="large" />}
              {label && <div>{link.label}</div>}
            </div>
          );
        })
      }
    </div>
  );
};

export { MenuIconList };

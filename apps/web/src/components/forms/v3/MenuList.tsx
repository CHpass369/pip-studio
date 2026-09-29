import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FolderIcon from '@mui/icons-material/Folder';
import HandymanIcon from '@mui/icons-material/Handyman';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PercentIcon from '@mui/icons-material/Percent';
import SchoolIcon from '@mui/icons-material/School';
import SellIcon from '@mui/icons-material/Sell';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StraightenIcon from '@mui/icons-material/Straighten';
import TuneIcon from '@mui/icons-material/Tune';

import { set_selected } from 'store/slices/global/menu.slice';

import './MenuList.scss';

interface ToolbarLink {
  uri: string;
  key: string;
  label: string;
}

interface MenuListProps {
  icon?: boolean;
  label?: boolean;
  links: ToolbarLink[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  shop: StorefrontIcon,
  home: HomeIcon,
  boxes: Inventory2Icon,
  box: ShoppingCartCheckoutIcon,
  gift: CardGiftcardIcon,
  shopping_cart: ShoppingCartIcon,
  shopping_basket: ShoppingBasketIcon,
  tags: SellIcon,
  expand: StraightenIcon,
  setting: SettingsIcon,
  percent: PercentIcon,
  folder: FolderIcon,
  map: MapIcon,
  construction: ConstructionIcon,
  engineering: EngineeringIcon,
  handyman: HandymanIcon,
  location: LocationOnIcon,
  school: SchoolIcon,
  tune: TuneIcon,
  long_arrow_alternate_up: ArrowUpwardIcon,
  long_arrow_alternate_down: ArrowDownwardIcon,
};

const MenuList = ({ icon = true, label = true, links }: MenuListProps) => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state: any) => state.menu);
  const navigate = useNavigate();

  const on_handle_route = (item: ToolbarLink) => {
    dispatch(set_selected(item));
    navigate(item.uri);
  };

  const render_link = (link: ToolbarLink, index: number) => {
    const IconComponent = ICON_MAP[link.key];

    return (
      <div
        key={index}
        className={selected && link.uri === selected.uri ? 'toolbar-list-item active' : 'toolbar-list-item'}
        onClick={() => on_handle_route(link)}
      >
        {icon && IconComponent && <div className="item-icon"><IconComponent fontSize="small" /></div>}
        {label && <div className="item-label">{link.label}</div>}
      </div>
    );
  };

  return (
    <div className="toolbar-list">
      {links.map(render_link)}
    </div>
  );
};

export { MenuList };

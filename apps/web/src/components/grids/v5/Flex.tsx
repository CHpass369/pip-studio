import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';

import './Flex.scss';

const DIRECTION = {
  H: 'ROW',
  V: 'COLUMN',
} as const;

type Direction = typeof DIRECTION[keyof typeof DIRECTION];
type Only = 'mobile' | 'computer' | 'screen';

interface FlexProps {
  children?: ReactNode;
  color?: string;
  class_name?: string;
  direction?: Direction;
}

const Flex = ({ children, color, class_name, direction = DIRECTION.V }: FlexProps) => {
  const style: CSSProperties = {};

  if (color) {
    style.background = color;
  }

  return (
    <div
      className={
        classNames(class_name, {
          'grid-5-row': direction === DIRECTION.H,
          'grid-5-column': direction === DIRECTION.V,
        })
      }
      style={style}
    >
      {children}
    </div>
  );
};

interface ItemProps {
  flex?: number;
  class_name?: string;
  only?: Only[];
  direction?: Direction;
  children?: ReactNode;
}

const Item = ({ flex = 1, class_name, only = ['mobile', 'computer', 'screen'], direction = DIRECTION.V, children }: ItemProps) => {
  const style: CSSProperties = {
    flex,
  };

  if (direction === DIRECTION.H) {
    style.overflowX = 'auto';
  }
  if (direction === DIRECTION.V) {
    style.overflowY = 'auto';
  }

  const class_names = only.map((item) => `grid-5-flex-${item}`).join(' ');

  return (
    <div className={classNames('grid-5-flex', class_name, class_names)} style={style}>
      {children}
    </div>
  );
};

interface ScrapProps {
  class_name?: string;
  width?: string;
  height?: string;
  only?: Only[];
  children?: ReactNode;
}

const Scrap = ({
  class_name,
  width = 'auto',
  height = 'auto',
  only = ['mobile', 'computer', 'screen'],
  children,
}: ScrapProps) => {
  const style: CSSProperties = { width, height };
  const class_names = only.map((item) => `grid-5-flex-${item}`).join(' ');

  return (
    <div className={classNames('grid-5-flex', class_name, class_names)} style={style}>
      {children}
    </div>
  );
};

interface SectionProps {
  children?: ReactNode;
  class_name?: string;
}

const Start = ({ children, class_name }: SectionProps) => (
  <div className={classNames('grid-5-start', class_name)}>
    {children}
  </div>
);

const Center = ({ children, class_name }: SectionProps) => (
  <div className={classNames('grid-5-center', class_name)}>
    {children}
  </div>
);

const End = ({ children, class_name }: SectionProps) => (
  <div className={classNames('grid-5-end', class_name)}>
    {children}
  </div>
);

const Content = ({ children, class_name }: SectionProps) => (
  <div className={classNames('grid-5-content', class_name)}>
    {children}
  </div>
);

const Buttoms = ({ children, class_name }: SectionProps) => (
  <div className={classNames('grid-5-buttons', class_name)}>
    {children}
  </div>
);

Flex.H = DIRECTION.H;
Flex.V = DIRECTION.V;

Flex.Item = Item;
Flex.Scrap = Scrap;

Flex.Start = Start;
Flex.Center = Center;
Flex.End = End;
Flex.Content = Content;
Flex.Buttoms = Buttoms;

export { Flex };

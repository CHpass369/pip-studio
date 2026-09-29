import { ReactNode, useEffect, useState } from 'react';

import { Flex, Container } from 'components/grids/v5';

import './Dimmer.scss';

interface DimmerProps {
  active?: boolean;
  children?: ReactNode;
}

const Dimmer = ({ active = false, children = null }: DimmerProps) => {
  const [loading, set_loading] = useState('Cargando');

  useEffect(() => {
    if (!active) {
      set_loading('Cargando');
      return undefined;
    }

    let count = 0;
    const timer = setInterval(() => {
      count = count >= 5 ? 1 : count + 1;
      set_loading(`Cargando${'.'.repeat(count)}`);
    }, 500);

    return () => clearInterval(timer);
  }, [active]);

  return (
    <Container position="relative" class_name="">
      <Container position="absolute" class_name="">
        {children}
      </Container>
      <Container position="absolute" class_name={active ? 'element-dimmer-show' : 'element-dimmer-hide'}>
        <Flex direction={Flex.V} class_name="element-dimmer">
          <div>
            {loading}
          </div>
        </Flex>
      </Container>
    </Container>
  );
};

export { Dimmer };

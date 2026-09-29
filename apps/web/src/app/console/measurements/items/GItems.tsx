import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

import { BUTTON_LABELS, PAGE_SIZE } from 'components/generics/v2';
import { Flex } from 'components/grids/v5';
import { LinearList } from 'components/lists/v2';
import { Search } from 'components/elements/v2';
import { ContentTitle, EmptyInfo } from 'components/titles/v3';

import { ITEMS_HEADER, ROUTE, EMPTY_LIST_MESSAGE } from '../constants';
import { service } from '../services';
import { Area } from 'administrator/models/area.model';
import { Measure } from 'app/models/measure.model';

interface GItemsProps {
  area: Area;
}

const GItems = ({ area }: GItemsProps) => {
  const navigate = useNavigate();
  const [items, set_items] = useState<Measure[]>([]);
  const [loading, set_loading] = useState(false);
  const page = useRef(0);

  const on_create = useCallback(() => {
    navigate(ROUTE.NEW);
  }, [navigate]);

  const on_select = useCallback((item: Measure) => {
    navigate(`${ROUTE.LIST}/${item._id}`);
  }, [navigate]);

  const load_page = useCallback((search: string | null, page: number) => {
    if (page === 0) return;

    set_loading(true);
    const params: Record<string, any> = { area_id: area._id };
    if (search) {
      params.search = search;
    }

    service.find_by({ page, limit: PAGE_SIZE }, params)
    .then(({ data }) => {
      if (page === 1) {
        set_items([...data]);
      } else {
        set_items((prev) => [...prev, ...data]);
      }
      set_loading(false);
    })
    .catch(() => {
      set_loading(false);
    });
  }, []);

  const on_search = useCallback((search: string) => {
    page.current = 1;
    load_page(search, page.current);
  }, [area]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        if (page.current === (items.length / PAGE_SIZE)) {
          load_page(null, ++page.current);
        }
        console.log("cargando...", page.current);
      }
    }, { threshold: 1 });

    const el = document.getElementById('sentinel');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={ITEMS_HEADER} />

      {/* Search Bar */}
      <Flex.Buttoms>
        <Search on_search={on_search} />
        <Button variant="contained" onClick={on_create}>{BUTTON_LABELS.NEW}</Button>
      </Flex.Buttoms>

      {/* Flat List */}
      <Flex.Item>
        {(items.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
        {(items.length > 0) && <LinearList items={items} loading={loading} on_select={on_select} />}
        <div id="sentinel">
          {loading && <p>Cargando...</p>}
        </div>
      </Flex.Item>
    </Flex>
  );
};

export { GItems };
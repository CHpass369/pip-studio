import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

import { BUTTON_LABELS, PAGE_SIZE } from 'components/generics/v2';
import { Flex } from 'components/grids/v5';
import { Search } from 'components/elements/v2';
import { ContentTitle, EmptyInfo } from 'components/titles/v3';
import { List } from './list/List';

import { ITEMS_HEADER, ROUTE, EMPTY_LIST_MESSAGE } from '../constants';
import { service } from '../services';
import { Area } from 'administrator/models/area.model';
import { ParameterSet } from 'app/models/parameter.model';

interface GItemsProps {
  area: Area;
}

const GItems = ({ area }: GItemsProps) => {
  const navigate = useNavigate();
  const [items, set_items] = useState<ParameterSet[]>([]);
  const [search, set_search] = useState('');
  const [page, set_page] = useState(1);
  const [loading, set_loading] = useState(false);
  const [has_more, set_has_more] = useState(true);
  const loader_ref = useRef<any>(null);

  const on_create = useCallback(() => {
    navigate(ROUTE.NEW);
  }, [navigate]);

  const on_select = useCallback((item: ParameterSet) => {
    navigate(`${ROUTE.LIST}/${item._id}`);
  }, [navigate]);

  useEffect(() => {
    if (loading || !has_more) return;
    set_loading(true);

    const params: Record<string, any> = { area_id: area._id };
    if (search) {
      params.search = search;
    }

    service.find_by({ page, limit: PAGE_SIZE }, params)
    .then(({ data }) => {
      set_items((prev) => (page === 1 ? data : [...prev, ...data]));
      set_has_more(data.length === PAGE_SIZE);
      set_loading(false);
    })
    .catch(() => {
      set_loading(false);
      set_has_more(false);
    });
  }, [area, search, page]); // Removed loading/has_more from dependencies to prevent infinite loop but kept logic clean

  useEffect(() => {
    set_items([]);
    set_page(1);
    set_has_more(true);
    set_loading(false);
  }, [area, search]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && has_more && !loading) {
        set_page((prev) => prev + 1);
      }
    }, { threshold: 0.5 });

    const el = loader_ref.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [has_more, loading]);

  const filtered_items = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (item.label || '').toLowerCase().includes(q) ||
      (item.key || '').toLowerCase().includes(q)
    );
  });

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={ITEMS_HEADER} />

      {/* Search Bar */}
      <Flex.Scrap>
      </Flex.Scrap>
      <Flex.Buttoms>
        <Search on_search={set_search} />
        <Button variant="contained" onClick={on_create}>{BUTTON_LABELS.NEW}</Button>
      </Flex.Buttoms>

      {/* Flat List */}
      <Flex.Item>
        {(items.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
        {(items.length > 0) && <List items={filtered_items} on_select={on_select} />}
      </Flex.Item>

      {/* Infinite Scroll Loader */}
      {has_more && (
        <div ref={loader_ref} style={{ height: '1px' }} />
      )}
      {loading && <p>Cargando...</p>}
    </Flex>
  );
};

export { GItems };

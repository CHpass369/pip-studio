import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

import { BUTTON_LABELS, PAGE_SIZE } from 'components/generics/v2';
import { Flex } from 'components/grids/v5';
import { Search } from 'components/elements/v2';
import { ContentTitle, EmptyInfo } from 'components/titles/v3';
import { toast } from 'generics/services/v4';
import app_service from 'app/api/v1';

import { ITEMS_HEADER, ROUTE, EMPTY_LIST_MESSAGE } from '../constants';
import { service } from '../services';
import { List } from './main-list/List';
import { Area } from 'administrator/models/area.model';
import { Construction } from 'app/models/construction.model';

interface GItemsProps {
  area: Area;
}

const GItems = ({ area }: GItemsProps) => {
  const navigate = useNavigate();
  const [items, set_items] = useState<Construction[]>([]);
  const [loading, set_loading] = useState(false);
  const page = useRef(0);

  const [measures, set_measures] = useState(new Map<string, string>());

  const on_create = useCallback(() => {
    navigate(ROUTE.NEW);
  }, [navigate]);

  const on_select = useCallback((item: Construction) => {
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

  useEffect(() => {
    if (!area?._id) return;
    app_service.measures.find({ area_id: area._id })
    .then(({ data }) => {
      set_measures(new Map(data.map((m): [string, string] => [m._id, `${m.name} (${m.abbreviation})`])));
    })
    .catch(toast.api_danger);
  }, [area]);

  const get_measure = useCallback((mesure_id: string) => {
    return measures.get(mesure_id) || '';
  }, [measures]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={ITEMS_HEADER} />
      <Flex.Buttoms>
        <Search on_search={on_search} />
        <Button variant="contained" onClick={on_create}>{BUTTON_LABELS.NEW}</Button>
      </Flex.Buttoms>
      <Flex.Item>
        {(items.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
        {(items.length > 0) && <List items={items} on_select={on_select} get_measure={get_measure} />}
        <div id="sentinel">
          {loading && <p>Cargando...</p>}
        </div>
      </Flex.Item>
    </Flex>
  );
};

export { GItems };

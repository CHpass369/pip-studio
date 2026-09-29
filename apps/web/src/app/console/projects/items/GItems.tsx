import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { PAGE_SIZE } from 'components/generics/v2';
import { Flex } from 'components/grids/v5';
import { Search } from 'components/elements/v2';
import { ContentTitle, EmptyInfo } from 'components/titles/v3';
import { toast } from 'generics/services/v4';
import app_service from 'app/api/v1';

import { ITEMS_HEADER, ROUTE, EMPTY_LIST_MESSAGE } from '../constants';
import { service } from '../services';
import { List } from './main-list/List';
import { CreateProjectConfirmation } from './modals/CreateProjectConfirmation';
import { Area } from 'administrator/models/area.model';
import { Zone } from 'app/models/zone.model';
import { Project } from 'app/models/project.model';

interface GItemsProps {
  area: Area;
}

const GItems = ({ area }: GItemsProps) => {
  const navigate = useNavigate();
  const { account } = useSelector((state: any) => state.auth);
  const [items, set_items] = useState<Project[]>([]);
  const [loading, set_loading] = useState(false);
  const [zone_list, set_zone_list] = useState<Zone[]>([]);
  const [zone_ids, set_zone_ids] = useState<string[]>([]);
  const page = useRef(0);
  const search_ref = useRef('');

  const on_select = useCallback((item: Project) => {
    navigate(`${ROUTE.LIST}/${item._id}`);
  }, [navigate]);

  const on_clone = useCallback((item: Project) => {
    if (!item) {
      throw new Error('item is undefined');
    }
    const clone_data: Partial<Project> = {
      ...item,
      name: item.name + ' (clon)',
      is_lock: false,
      locked_by: null,
      modules: (item.modules || []).map((module) => ({
        ...module,
        is_lock: false,
        locked_by: null,
      })),
    };
    delete clone_data._id;
    delete clone_data.created;
    delete clone_data.updated;

    service.create(clone_data)
    .then(({ data }) => {
      set_items((prev) => [data, ...prev]);
    })
    .catch(toast.api_danger);
  }, []);

  const on_delete = useCallback((item: Project) => {
    if (!item) {
      throw new Error('item is undefined');
    }
    service.remove(item._id)
    .then(() => {
      set_items((prev) => prev.filter((current) => current._id !== item._id));
    })
    .catch(toast.api_danger);
  }, []);

  const on_lock = useCallback((item: Project) => {
    if (!item) {
      throw new Error('item is undefined');
    }
    const is_owner = !!(account && item.locked_by && account._id === item.locked_by._id);
    if (item.is_lock && !is_owner) {
      toast.danger(`Este proyecto esta bloqueado por ${item.locked_by?.username || 'otro usuario'}`);
      return;
    }
    const value = { is_lock: !item.is_lock, locked_by: !item.is_lock ? { username: account?.username, _id: account?._id } : null };

    service.update(item._id, value)
    .then(() => {
      set_items((prev) => prev.map((current) => (current._id === item._id ? { ...current, ...value } : current)));
    })
    .catch(toast.api_danger);
  }, [account]);

  const load_page = useCallback((search: string, page: number, zone_ids: string[]) => {
    if (page === 0) return;

    set_loading(true);
    const params: Record<string, any> = { area_id: area._id };
    if (search) {
      params.search = search;
    }
    if (zone_ids && zone_ids.length) {
      params.zones = zone_ids;
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
  }, [area]);

  const on_search = useCallback((search: string) => {
    search_ref.current = search;
    page.current = 1;

    load_page(search, page.current, zone_ids);
  }, [load_page, zone_ids]);

  const on_zones_change = useCallback((event: any) => {
    const { value } = event.target;
    const zones = typeof value === 'string' ? value.split(',') : value;

    set_zone_ids(zones);
    page.current = 1;
    load_page(search_ref.current, page.current, zones);
  }, [load_page]);

  useEffect(() => {
    app_service.zones.find({ area_id: area._id })
    .then(({ data }) => {
      set_zone_list(data);
    })
    .catch(toast.api_danger);
  }, [area]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        if (page.current === (items.length / PAGE_SIZE)) {
          load_page(search_ref.current, ++page.current, zone_ids);
        }
      }
    }, { threshold: 1 });

    const el = document.getElementById('sentinel');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <Flex class_name="text-separator">
      <ContentTitle config={ITEMS_HEADER} />
      <Flex.Buttoms>
        <Search on_search={on_search} />
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel size='small' id="form-zones-filter-label">Zonas</InputLabel>
          <Select
            fullWidth
            multiple
            label="Zonas"
            size='small'
            labelId="form-zones-filter-label"
            value={zone_ids}
            onChange={on_zones_change}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((zone_id) => {
                  const zone = zone_list.find((zone) => zone._id === zone_id);
                  return <Chip key={zone_id} label={zone ? zone.name : zone_id} />;
                })}
              </Box>
            )}
          >
            {
              zone_list.map((zone) => (
                <MenuItem key={zone._id} value={zone._id}>
                  {zone.name}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <CreateProjectConfirmation area={area} />
      </Flex.Buttoms>
      <Flex.Item>
        {(items.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
        {(items.length > 0) && <List items={items} on_select={on_select} on_clone={on_clone} on_delete={on_delete} on_lock={on_lock} />}
        <div id="sentinel">
          {loading && <p>Cargando...</p>}
        </div>
      </Flex.Item>
    </Flex>
  );
};

export { GItems };

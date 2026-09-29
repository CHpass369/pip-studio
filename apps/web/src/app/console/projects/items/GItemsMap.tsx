import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { Flex } from 'components/grids/v5';
import { Search } from 'components/elements/v2';
import { ProjectsOverviewMap } from 'components/maps/v1';
import { toast } from 'generics/services/v4';
import app_service from 'app/api/v1';
import { service } from '../services';
import { Area } from 'administrator/models/area.model';
import { Zone } from 'app/models/zone.model';
import { Project } from 'app/models/project.model';

const DEFAULT_PAGE_SIZE = 50;

interface GItemsMapProps {
  area: Area;
}

const GItemsMap = ({ area }: GItemsMapProps) => {
  if (!area) {
    throw new Error('area is undefined');
  }

  const [items, set_items] = useState<Project[]>([]);
  const [loading, set_loading] = useState(false);
  const [zone_list, set_zone_list] = useState<Zone[]>([]);
  const [zone_ids, set_zone_ids] = useState<string[]>([]);
  const [page_size, set_page_size] = useState<number | ''>(DEFAULT_PAGE_SIZE);
  const search_ref = useRef('');

  const load_first_page = useCallback((search: string, zone_ids: string[], page_size: number | '') => {
    set_loading(true);
    const params: Record<string, any> = { area_id: area._id };
    if (search) {
      params.search = search;
    }
    if (zone_ids && zone_ids.length) {
      params.zones = zone_ids;
    }

    service.find_by({ page: 1, limit: page_size || DEFAULT_PAGE_SIZE }, params)
    .then(({ data }) => {
      set_items([...data]);
      set_loading(false);
    })
    .catch(() => {
      set_loading(false);
    });
  }, [area]);

  const on_search = useCallback((search: string) => {
    search_ref.current = search;
    load_first_page(search, zone_ids, page_size);
  }, [load_first_page, zone_ids, page_size]);

  const on_zones_change = useCallback((event: any) => {
    const { value } = event.target;
    const zones = typeof value === 'string' ? value.split(',') : value;
    set_zone_ids(zones);
    load_first_page(search_ref.current, zones, page_size);
  }, [load_first_page, page_size]);

  const on_page_size_change = useCallback((event: any) => {
    const value = parseInt(event.target.value, 10);
    const next_page_size = Number.isNaN(value) ? '' : value;
    set_page_size(next_page_size);
    if (!next_page_size) return;

    load_first_page(search_ref.current, zone_ids, next_page_size);
  }, [load_first_page, zone_ids]);

  useEffect(() => {
    app_service.zones.find({ area_id: area._id })
    .then(({ data }) => {
      set_zone_list(data);
    })
    .catch(toast.api_danger);
  }, [area]);

  useEffect(() => {
    load_first_page(search_ref.current, zone_ids, page_size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load_first_page]);

  return (
    <Flex class_name="text-separator">
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
        <TextField
          type="number"
          size='small'
          label="Tamaño de página"
          style={{ minWidth: 160 }}
          value={page_size}
          onChange={on_page_size_change}
        />
      </Flex.Buttoms>
      <Flex.Item>
        {loading && <p>Cargando...</p>}
        <ProjectsOverviewMap projects={items} />
      </Flex.Item>
    </Flex>
  );
};

export { GItemsMap };

import { useCallback, useRef, useState } from 'react';
import { AxiosPromise } from 'axios';

import { toast } from 'generics/services/v4';
import loader from 'generics/services/v4/loader.service';
import { PAGE_SIZE } from 'components/generics/v2';

interface PaginationService<T> {
  find_by: (pagination: { page: number; limit: number }, params: Record<string, string>) => AxiosPromise<T[]>;
}

const useCrudPagination = <T>(service: PaginationService<T>, search_property: string, extra_params: Record<string, string> = {}) => {
  const [items, set_items] = useState<T[]>([]);
  const [loading, set_loading] = useState(false);
  const page = useRef(0);

  const load_page = useCallback((search: string | null, page: number) => {
    if (page === 0) return;

    set_loading(true);
    const params = search ? { ...extra_params, [search_property]: search } : { ...extra_params };

    loader.resolve()
    .then(loader.start)
    .then(() => service.find_by({ page, limit: PAGE_SIZE }, params))
    .then(({ data }) => {
      if (page === 1) {
        set_items([...data]);
      } else {
        set_items((prev) => [...prev, ...data]);
      }
    })
    .then(loader.stop)
    .catch(loader.error)
    .catch(toast.api_danger)
    .finally(() => set_loading(false));
  }, [service, search_property, extra_params]);

  const on_search = useCallback((search: string) => {
    page.current = 1;
    load_page(search, page.current);
  }, [load_page]);

  const on_load_more = useCallback(() => {
    if (page.current === (items.length / PAGE_SIZE)) {
      load_page(null, ++page.current);
    }
  }, [items, load_page]);

  return { items, loading, on_search, on_load_more };
};

export { useCrudPagination };

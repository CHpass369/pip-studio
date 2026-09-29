import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { AxiosPromise } from 'axios';

import { toast } from 'generics/services/v4';

interface CrudService<T> {
  create: (params: Partial<T>) => AxiosPromise<T>;
  update: (_id: string, params: Partial<T>) => AxiosPromise<T>;
  remove: (_id: string) => AxiosPromise<T>;
}

const useCrudNavigation = <T>(service: CrudService<T>, list_route: string, _id?: string) => {
  const navigate = useNavigate();

  const go_to_list = useCallback((promise: AxiosPromise<T>) => {
    promise
    .then(() => {
      navigate(list_route);
    })
    .catch(toast.api_danger);
  }, [navigate, list_route]);

  const on_save = useCallback((item: Partial<T>) => {
    go_to_list(service.create(item));
  }, [go_to_list, service]);

  const on_update = useCallback((item: Partial<T>) => {
    go_to_list(service.update(_id as string, item));
  }, [go_to_list, service, _id]);

  const on_remove = useCallback(() => {
    go_to_list(service.remove(_id as string));
  }, [go_to_list, service, _id]);

  const on_cancel = useCallback(() => {
    navigate(list_route);
  }, [navigate, list_route]);

  return { on_save, on_update, on_remove, on_cancel };
};

export { useCrudNavigation };

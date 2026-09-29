import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import { Tooltip } from '@mui/material';
import { Flex } from 'components/grids/v5';
import { project_total } from '../../defaultModuleData';
import { Label } from 'components/labels/v1';
import { DeleteConfirmation } from './DeleteConfirmation';
import { Project } from 'app/models/project.model';

interface ListItemProps {
  index: number;
  item: Project;
  on_select: (item: Project) => void;
  on_clone: (item: Project) => void;
  on_delete: (item: Project) => void;
  on_lock: (item: Project) => void;
}

const ListItem = ({ index, item, on_select, on_clone, on_delete, on_lock }: ListItemProps) => {
  const { account } = useSelector((state: any) => state.auth);
  const [delete_open, set_delete_open] = useState(false);

  const is_locked = !!item.is_lock;
  const is_owner = !!(account && item.locked_by && account._id === item.locked_by._id);
  const can_edit = !is_locked || is_owner;
  const lock_tooltip = is_locked
    ? `Bloqueado por ${item.locked_by?.username || 'otro usuario'}`
    : 'Bloquear proyecto';

  const on_click = (e: React.MouseEvent) => {
    e.stopPropagation();
    on_select(item);
  };

  const on_clone_click = (e: any) => {
    e.stopPropagation();
    on_clone(item);
  };

  const on_lock_click = (e: any) => {
    e.stopPropagation();
    on_lock(item);
  };

  const on_delete_open = (e: any) => {
    e.stopPropagation();
    set_delete_open(true);
  };

  const on_delete_confirm = () => {
    on_delete(item);
  };

  return (
    <div className="report-list-item" onClick={on_click} >
      <Flex direction={Flex.H}>
        <Flex.Item flex={1}>{index}</Flex.Item>
        <Flex.Item flex={5}>{item.name}</Flex.Item>
        <Flex.Item flex={2}><Label.BsCoin value={project_total(item)} /></Flex.Item>
        <Flex.Item flex={2}>{moment(item.start_date).fromNow()}</Flex.Item>
        <Flex.Item flex={2}>{moment(item.end_date).fromNow()}</Flex.Item>
        {/* <Flex.Item flex={2}>{moment(item.created).format('DD/MM/YYYY LT')}</Flex.Item> */}
        <Flex.Item flex={1}>
          <Tooltip title={lock_tooltip}>
            <span>
              <IconButton size="small" onClick={on_lock_click} disabled={is_locked && !is_owner}>
                <LockIcon fontSize="small" color={is_locked ? 'success' : 'inherit'} />
              </IconButton>
            </span>
          </Tooltip>
          <IconButton size="small" onClick={on_clone_click} disabled={!can_edit}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={on_delete_open} disabled={!can_edit}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Flex.Item>
      </Flex>
      <DeleteConfirmation
        open={delete_open}
        on_close={() => set_delete_open(false)}
        on_confirm={on_delete_confirm}
        name={item.name}
      />
    </div>
  );
};

export { ListItem };

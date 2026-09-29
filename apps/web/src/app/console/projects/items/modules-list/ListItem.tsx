import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex } from 'components/grids/v5';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import { Title, EmptyInfo } from 'components/titles/v3';

import { ModuleList } from './ModuleList';
import { ScheduleDialog } from './ScheduleDialog';
import { DeleteConfirmation } from './DeleteConfirmation';
import { useStringReducer } from 'generics/functions/forms/v2';
import actions from 'store/actions/console';
import { set_copied_module } from 'store/slices/project.slice';
import { ProjectModule } from 'app/models/project.model';

const EMPTY_LIST_MESSAGE = 'No existe construcciones registradas';

import './ListItem.scss';
import { Label } from 'components/labels/v1';
import { Switch, Tooltip } from '@mui/material';

interface ListItemProps {
  index: number;
  item: ProjectModule;
  on_select: (item: ProjectModule) => void;
}

const ListItem = ({ index, item, on_select }: ListItemProps) => {
  const dispatch = useDispatch();
  const { module_id } = useSelector((state: any) => state.project_assets);
  const { account } = useSelector((state: any) => state.auth);
  const project = useSelector((state: any) => state.project);
  const [schedule_open, set_schedule_open] = useState(false);
  const [delete_open, set_delete_open] = useState(false);

  const is_locked = !!item.is_lock;
  const is_owner = !!(account && item.locked_by && account._id === item.locked_by._id);
  const can_edit = !is_locked || is_owner;
  const lock_tooltip = is_locked
    ? `Bloqueado por ${item.locked_by?.username || 'otro usuario'}`
    : 'Bloquear modulo';

  const on_click = (e: React.MouseEvent) => {
    e.stopPropagation();
    on_select(item);
  };

  const on_lock = (e: any) => {
    e.stopPropagation();
    dispatch(actions.project.module_update(item._id, { is_lock: !item.is_lock }));
  };

  const on_download = (e: any) => {
    e.stopPropagation();
  };

  const on_schedule_open = (e: any) => {
    e.stopPropagation();
    set_schedule_open(true);
  };

  const on_delete_open = (e: any) => {
    e.stopPropagation();
    set_delete_open(true);
  };

  const on_copy = (e: any) => {
    e.stopPropagation();
    dispatch(set_copied_module(item));
  };

  const on_delete_confirm = () => {
    dispatch(actions.project.module_event(item._id, { type: 'remove' }));
  };

  const on_arrowdown = (e: any) => {
    e.stopPropagation();
    dispatch(actions.project.module_event(item._id, { type: 'arrowdown' }));
  };

  const on_arrowup = (e: any) => {
    e.stopPropagation();
    dispatch(actions.project.module_event(item._id, { type: 'arrowup' }));
  };

  const on_string_change = (event: any) => {
    event.stopPropagation();
    dispatch(actions.project.module_update(module_id, {
      name: event.target.value,
    }));
  };

  const on_switch_change = (event: any) => {
    event.stopPropagation();
    dispatch(actions.project.module_update(item._id, {
      is_active: event.target.checked,
    }));
  };

  const on_module_dates_change = (data: Partial<ProjectModule>) => {
    if (!data) {
      throw new Error('data is undefined');
    }
    dispatch(actions.project.module_update(item._id, data));
  };

  const on_item_schedule_change = (construction_id: string, schedule_data: any) => {
    if (!construction_id) {
      throw new Error('construction_id is undefined');
    }
    if (!schedule_data) {
      throw new Error('schedule_data is undefined');
    }
    dispatch(actions.project.update_construction(item._id, {
      _id: construction_id,
      offset_days: schedule_data.offset_days,
      days: schedule_data.days,
      start_date: schedule_data.start_date,
      end_date: schedule_data.end_date,
    }));
  };

  const on_item_critical_change = (construction_id: string, is_critical: boolean) => {
    if (!construction_id) {
      throw new Error('construction_id is undefined');
    }
    dispatch(actions.project.update_construction(item._id, {
      _id: construction_id,
      is_critical,
    }));
  };

  return (
    <Flex.Scrap class_name={item._id === module_id ? 'report-project-list-item-select' :  'report-project-list-item'}>
    <div onClick={on_click}>
      <Flex direction={Flex.H}>
        <Title value={`${index}`} />
        <Flex.Item flex={2}>
          <input type="text" name="name" value={item.name} className="quantity-input" onChange={on_string_change} disabled={!can_edit} />
        </Flex.Item>
        <Flex.Item flex={1}>
          <IconButton size="small" onClick={on_arrowdown} disabled={!can_edit}>
            <KeyboardDoubleArrowDownIcon />
          </IconButton>
          <IconButton size="small" onClick={on_arrowup} disabled={!can_edit}>
            <KeyboardDoubleArrowUpIcon />
          </IconButton>
          <IconButton size="small" onClick={on_delete_open} disabled={!can_edit}>
            <DeleteIcon />
          </IconButton>
          <IconButton size="small" onClick={on_copy}>
            <ContentCopyIcon />
          </IconButton>
        </Flex.Item>
        <Flex.Buttoms>
          <Switch
            checked={item.is_active}
            onClick={(e) => e.stopPropagation()}
            onChange={on_switch_change}
            disabled={!can_edit}
            slotProps={{ input: { 'aria-label': 'controlled' } }}
          />
          <Tooltip title={lock_tooltip}>
            <span>
              <IconButton size="small" onClick={on_lock} disabled={is_locked && !is_owner}>
                <LockIcon color={is_locked ? 'success' : 'inherit'} />
              </IconButton>
            </span>
          </Tooltip>
          <IconButton size="small" onClick={on_schedule_open} disabled={!can_edit}>
            <CalendarMonthIcon />
          </IconButton>
          {/* <IconButton size="small" onClick={on_download}>
            <FileDownloadIcon />
          </IconButton> */}
        </Flex.Buttoms>
      </Flex>
      <Flex.Scrap>
        <div>
          {(item.constructions.length === 0) && <EmptyInfo description={EMPTY_LIST_MESSAGE} />}
          {(item.constructions.length > 0) && <ModuleList module_id={item._id} items={item.constructions} />}
        </div>
      </Flex.Scrap>
      <Flex.Scrap class_name="report-list-item">
        <Flex direction={Flex.H}>
          <Flex.Item flex={5}>Total Parcial</Flex.Item>
          <Flex.Item flex={2}>
            <Label.BsCoin value={item.constructions.reduce((acc, c) => { return acc + (c.unit_price * c.quantity) }, 0)} />
          </Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
          <Flex.Item flex={2}></Flex.Item>
        </Flex>
      </Flex.Scrap>
    </div>
    <ScheduleDialog
      open={schedule_open}
      on_close={() => set_schedule_open(false)}
      items={item.constructions}
      module_start_date={item.start_date}
      module_end_date={item.end_date}
      project_start_date={project.start_date}
      project_end_date={project.end_date}
      on_module_dates_change={on_module_dates_change}
      on_item_schedule_change={on_item_schedule_change}
      on_item_critical_change={on_item_critical_change}
    />
    <DeleteConfirmation
      open={delete_open}
      on_close={() => set_delete_open(false)}
      on_confirm={on_delete_confirm}
      name={item.name}
    />
    </Flex.Scrap>
  );
};

export { ListItem };

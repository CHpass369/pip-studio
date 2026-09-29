import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Flex } from 'components/grids/v5';

const M2_ALIASES = ['m2', 'M2', 'm²', 'M²'];
const M3_ALIASES = ['m3', 'M3', 'm³', 'M³'];

const TYPE_LABELS = {
  m2: 'Metros Cuadrados (m2)',
  m3: 'Metros Cúbicos (m3)',
  grl: 'General (Grl)',
};

const resolve_type = (raw_type: any) => {
  if (!raw_type) {
    return 'grl';
  }
  if (M2_ALIASES.includes(raw_type)) {
    return 'm2';
  }
  if (M3_ALIASES.includes(raw_type)) {
    return 'm3';
  }
  return 'grl';
};

interface VolumeCalculatorDialogProps {
  open: boolean;
  on_close: () => void;
  on_submit: (volume: number, metric_calculation: { type: string; calculation: any[] }) => void;
  on_remove: () => void;
  initial_type?: string;
  metric_calculation?: Record<string, any> | null;
}

const VolumeCalculatorDialog = ({ open, on_close, on_submit, on_remove, initial_type = 'grl', metric_calculation = {} }: VolumeCalculatorDialogProps) => {
  const type = useMemo(
    () => resolve_type(metric_calculation?.type || initial_type),
    [metric_calculation, initial_type]
  );
  const [items, set_items] = useState(
    metric_calculation?.calculation?.length > 0
      ? metric_calculation.calculation
      : [{ _id: uuidv4(), name: '', times: 1, x: 0, y: 0, z: 0 }]
  );

  const handle_add_item = () => {
    set_items([...items, { _id: uuidv4(), name: '', times: 1, x: 0, y: 0, z: 0 }]);
  };

  const handle_remove_item = (_id: string) => {
    set_items(items.filter((item) => item._id !== _id));
  };

  const handle_item_change = (_id: string, field: any, value: any) => {
    set_items(
      items.map((item) => {
        if (item._id === _id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const total_quantity = useMemo(() => {
    return items.reduce((acc, item) => {
      let vol = 0;
      const times = parseFloat(item.times) || 0;
      const x = parseFloat(item.x) || 0;
      const y = parseFloat(item.y) || 0;
      const z = parseFloat(item.z) || 0;

      if (type === 'grl') {
        vol = x;
      } else if (type === 'm2') {
        vol = x * y;
      } else if (type === 'm3') {
        vol = x * y * z;
      }
      return acc + vol * times;
    }, 0);
  }, [items, type]);

  const handle_submit = () => {
    on_submit(total_quantity, { type, calculation: items });
    on_close();
  };

  const handle_remove = () => {
    if (!on_remove) {
      throw new Error('on_remove is undefined');
    }

    on_remove();
    on_close();
  };

  return (
    <Dialog open={open} onClose={on_close} maxWidth="md" fullWidth onClick={(e) => e.stopPropagation()}>
      <DialogTitle>Calcular Volumen</DialogTitle>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <Flex direction={Flex.V}>
          <div style={{ fontWeight: 'bold' }}>{TYPE_LABELS[type]}</div>

          <Flex direction={Flex.V}>
            {items.map((item, index) => (
              <Flex direction={Flex.H} key={item._id}>
                <TextField
                  label="Nombre"
                  size="small"
                  value={item.name}
                  onChange={(e) => handle_item_change(item._id, 'name', e.target.value)}
                  style={{ flex: 2 }}
                />
                <TextField
                  label="Veces"
                  type="number"
                  size="small"
                  value={item.times}
                  onChange={(e) => handle_item_change(item._id, 'times', e.target.value)}
                  style={{ flex: 1 }}
                />
                <TextField
                  label="X"
                  type="number"
                  size="small"
                  value={item.x}
                  onChange={(e) => handle_item_change(item._id, 'x', e.target.value)}
                  style={{ flex: 1 }}
                />
                {(type === 'm2' || type === 'm3') && (
                  <TextField
                    label="Y"
                    type="number"
                    size="small"
                    value={item.y}
                    onChange={(e) => handle_item_change(item._id, 'y', e.target.value)}
                    style={{ flex: 1 }}
                  />
                )}
                {type === 'm3' && (
                  <TextField
                    label="Z"
                    type="number"
                    size="small"
                    value={item.z}
                    onChange={(e) => handle_item_change(item._id, 'z', e.target.value)}
                    style={{ flex: 1 }}
                  />
                )}
                <IconButton size="small" onClick={() => handle_remove_item(item._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Flex>
            ))}
          </Flex>
          
          <Flex direction={Flex.H}>
            <Button startIcon={<AddIcon />} onClick={handle_add_item} size="small">
              Agregar Item
            </Button>
            <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
              Total: {total_quantity.toFixed(2)}
            </div>
          </Flex>

          <div style={{ fontSize: '0.85em', color: 'rgba(0, 0, 0, 0.6)' }}>
            El tipo se detecta automáticamente según la unidad de medida: m2 = [{M2_ALIASES.join(', ')}], m3 = [{M3_ALIASES.join(', ')}], cualquier otra unidad se calcula como {TYPE_LABELS.grl}.
          </div>
        </Flex>
      </DialogContent>
      <DialogActions onClick={(e) => e.stopPropagation()}>
        {on_remove && metric_calculation?.calculation?.length > 0 && (
          <Button onClick={handle_remove} color="error" style={{ marginRight: 'auto' }}>
            Quitar
          </Button>
        )}
        <Button onClick={on_close}>Cancelar</Button>
        <Button onClick={handle_submit} variant="contained" color="primary">
          Aplicar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { VolumeCalculatorDialog };

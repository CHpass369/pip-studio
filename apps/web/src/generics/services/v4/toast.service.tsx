import { GENERIC } from 'generics/constants';
import { toast } from 'sonner';
import { MyIcon } from './utils/MyIcon';

const success = (message) => {
  toast(GENERIC.APP_SHORT_NAME, {
    className: 'my-classname',
    description: message,
    duration: 2000,
    icon: <MyIcon />,
  });
};

const danger = (message) => {
  toast(GENERIC.APP_SHORT_NAME, {
    className: 'my-classname',
    description: message,
    duration: 2000,
    icon: <MyIcon />,
  });
};

const warning = (message) => {
  toast(GENERIC.APP_SHORT_NAME, {
    className: 'my-classname',
    description: message,
    duration: 2000,
    icon: <MyIcon />,
  });
};

const api_danger = (err) => {
  if (err.response) {
    danger(err.response.data.message);
    return;
  }

  /* eslint-disable no-console */
  console.error(err);
};

export default { success, danger, warning, api_danger };

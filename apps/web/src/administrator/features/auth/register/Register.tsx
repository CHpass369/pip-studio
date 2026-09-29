import { useReducer, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

import { BUTTON_LABELS } from 'components/generics/v2';
import { ContentTitle } from 'components/titles/v3';
import { GENERIC, BACKGROUND } from 'generics/constants';
import { Screen } from 'components/screens/v2';
import setting_actions from 'store/actions/settings';
import api from 'administrator/api/accounts/v3';
import { form_helper } from 'generics/functions/globals';
import { toast } from 'generics/services/v4';
import { Flex, Container } from 'components/grids/v5';
import { WTextField } from 'components/forms/v3';

import { HContent, VContainer, VContent, CContainer } from 'components';
import { Header } from '../../header/Header';

import { REGISTER_HEADER } from '../constants';

import './Register.scss';

interface RegisterForm {
  email?: string;
  password?: string;
  eula?: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, set_item] = useReducer(form_helper.reducer, {}) as [RegisterForm, Dispatch<{ name: string; value: any }>];

  const on_submit = () => {
    if (!item.email) {
      toast.danger('agregar un email correctamente');
      return;
    }
    if (!item.password) {
      toast.danger('agregar un password correctamente');
      return;
    }
    if (!item.eula) {
      toast.danger('los terminos y condicion no estan aceptados');
      return;
    }

    api.accounts.create(item)
    .then(({ data }) => {
      dispatch(setting_actions.accounts.set(data));
      navigate(GENERIC.APP_BASE_URL);
    })
    .catch(toast.api_danger);
  };

  const on_cancel = () => {
    navigate('/');
  };

  const on_change = (event: any) => {
    set_item({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const on_checkbox_change = (e: any, el: any) => {
    e.stopPropagation();
    set_item({
      name: el.name,
      value: el.checked,
    });
  };

  return (
    <Screen background={BACKGROUND}>
      <HContent>
        <VContainer>
          <Header />
          <VContent>
            <CContainer>
              <Container width="25rem" height="auto">
                <Flex class_name="text-separator">
                  <ContentTitle config={REGISTER_HEADER} />
                  <Flex.Item>
                    <Flex.Content>
                      <WTextField name="email" label="Email" value={item.email} onChange={on_change} />
                      <WTextField name="password" label="Password" type="password" value={item.password} onChange={on_change} />
                      <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          name="eula"
                          checked={item.eula || false}
                          onChange={(e: any) => on_checkbox_change(e, e.target)}
                          style={{ marginRight: '10px' }}
                        />
                        Estoy de acuerdo con los terminos y condiciones
                      </label>
                    </Flex.Content>
                    <Flex.Buttoms>
                      <Button variant="outlined" onClick={on_cancel}>{BUTTON_LABELS.CANCEL}</Button>
                      <Button variant="contained" onClick={on_submit}>Crear cuenta</Button>
                    </Flex.Buttoms>
                  </Flex.Item>
                </Flex>
              </Container>
            </CContainer>
          </VContent>
        </VContainer>
      </HContent>
    </Screen>
  );
};

export { Register };

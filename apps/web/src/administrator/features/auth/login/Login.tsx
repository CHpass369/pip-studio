import { useReducer, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

import { BUTTON_LABELS } from 'components/generics/v2';
import { ContentTitle } from 'components/titles/v3';
import { Flex, Container } from 'components/grids/v5';
import { GENERIC, BACKGROUND } from 'generics/constants';
import { Screen } from 'components/screens/v2';
import actions from 'store/actions/globals/v3';
import api from 'administrator/api/accounts/v3';
import { form_helper } from 'generics/functions/globals';
import { toast } from 'generics/services/v4';
import { HContent, VContainer, VContent, CContainer } from 'components';
import { WTextField } from 'components/forms/v3';
import { Header } from '../../header/Header';

import { LOGIN_HEADER } from '../constants';

import './Login.scss';

interface LoginForm {
  email?: string;
  password?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, set_item] = useReducer(form_helper.reducer, {}) as [LoginForm, Dispatch<{ name: string; value: any }>];

  const on_submit = () => {
    api.auth.login(item)
    .then(({ data }) => {
      dispatch(actions.auth.login(data));
      navigate(`${GENERIC.APP_BASE_URL}`);
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

  return (
    <Screen background={BACKGROUND}>
      <HContent>
        <VContainer>
          <Header />
          <VContent>
            <CContainer>
              <Container width="25rem" height="auto">
                <Flex class_name="text-separator">
                  <ContentTitle config={LOGIN_HEADER} />
                  <Flex.Item>
                    <Flex.Content>
                      <WTextField name="email" label="Email" value={item.email} onChange={on_change} />
                      <WTextField name="password" label="Password" type="password" value={item.password} onChange={on_change} />
                    </Flex.Content>
                    <Flex.Buttoms>
                      <Button variant="outlined" onClick={on_cancel}>{BUTTON_LABELS.CANCEL}</Button>
                      <Button variant="contained" onClick={on_submit}>Iniciar sesión</Button>
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

export { Login };

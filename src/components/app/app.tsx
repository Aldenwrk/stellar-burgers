import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch, useSelector } from '../../../src/services/store';
import { useEffect } from 'react';
import { checkUserAuth } from '../../../src/services/auth/actions';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { getIngredients } from '../../../src/services/ingredients/actions';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const userName = useSelector((store) => store.auth.user?.name);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  const navBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      <Routes>
        <Route
          path='/feed/:number'
          element={
            <Modal title={'Детали заказа'} onClose={navBack}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Детали ингредиента'} onClose={navBack}>
              <IngredientDetails />
            </Modal>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <OnlyAuth
              component={
                <Modal title={'Заказ'} onClose={navBack}>
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

//AlDen123

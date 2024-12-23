import { initialState as orderConstructor } from './orderConstructor/slice';
import { initialState as ingredients } from './ingredients/slice';
import { initialState as auth } from './auth/slice';
import { initialState as feeds } from './feeds/slice';
import store from './store';

// исправил пути апи с алиаса на обычные во всех редьюсерах, т.к. jest их не понимает

describe('Инициализация rootReducer', ()=>{
  it('Инициализируется и возвращает начальное состояние', ()=>{
    const state = store.getState();
     expect(state).toEqual({
       auth,
       ingredients,
       orderConstructor,
       feeds
     });
  });
});

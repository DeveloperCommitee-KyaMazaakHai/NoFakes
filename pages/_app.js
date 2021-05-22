import '../styles/scss/style.scss';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import homeReducer from '../store/reducers/Home';

export const rootReducer = combineReducers({
    home: homeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function MyApp({ Component, pageProps }) {
    return <Provider store={store}><Component{...pageProps}/></Provider>
}
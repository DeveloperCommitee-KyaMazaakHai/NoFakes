import '../styles/scss/style.scss';
import App from 'next/app';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import homeReducer from '../store/reducers/Home';
import withRedux from "next-redux-wrapper";

export const rootReducer = combineReducers({
    home: homeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        // Anything returned here can be accessed by the client
        return { pageProps: pageProps };
    }

    render() {
        // Page props that were returned  from 'getInitialProps' are stored in the props i.e. pageProps
        const { Component, pageProps } = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps}/>
            </Provider>
        );
    }
}

// makeStore function that returns a new store for every request
const makeStore = () => store;

// withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
import styles from "./app.module.css";
import { useEffect } from "react";
import AppHeader from "../appHeader/appHeader";
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames';
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/asyncActions/ingredientsApi";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Account from "../../pages/account/account";
import Registration from "../../pages/registerPages/registration/registration";
import SignIn from "../../pages/registerPages/signIn/signIn";
import ForgotPassword from "../../pages/registerPages/forgotPassword/forgotPassword";
import NewPassword from "../../pages/registerPages/newPassword/newPassword";
import OrderInfo from "../../pages/orderInfo/orderInfo";
import OrderFeed from "../../pages/orderFeed/orderFeed";
import IngredientInfo from "../../pages/ingredientInfo/ingredientInfo";
import IngredientAndConstructor from "../../pages/ingredientsAndConstructor/ingredientsAndConstructor";

import { ProtectedRouteElement } from "../protected-route";
import { AuthprotectedRouteElement } from "../auth-protected-route";

function App() {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);


    return (
        <>

            <AppHeader />
            <main className={classNames(styles.main, 'mb-10')}>
                <Router>
                    <Routes >
                        <Route path="/" element={<IngredientAndConstructor />} />
                        <Route path="/login" element={<AuthprotectedRouteElement element={<SignIn />} />} />
                        <Route path="/register" element={<AuthprotectedRouteElement element={<Registration />} />} />
                        <Route path="/forgot-password" element={<AuthprotectedRouteElement element={<ForgotPassword />} />} />
                        <Route path="/reset-password" element={<AuthprotectedRouteElement element={<NewPassword />} />} />
                        <Route path="/profile" element={<ProtectedRouteElement element={<Account />} />} />
                        <Route path="/profile/:section?" element={<ProtectedRouteElement element={<Account />} />} />
                        <Route path="/ingredients/:id" element={<ProtectedRouteElement element={<IngredientInfo />} />} />
                        <Route path='/feed' element={<OrderFeed />} />
                        <Route path='/feed/:number' element={<OrderInfo />} />
                        <Route path='/profile/orders/:number' element={<ProtectedRouteElement element={<OrderInfo/>} />} />

                    </Routes>
                </Router>
            </main>

        </>
    );
}

export default App;
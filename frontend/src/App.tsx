import React,{useEffect, useState} from 'react';
import {Navbar} from "./components/Navbar";
import classes from "./css/app.module.css";
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {HomePage} from "./components/HomePage"
import {LoginPage} from "./components/LoginPanel";
import {RegisterPanel} from "./components/RegisterPanel";
import {ShoppingCart} from "./components/ShoppingCart";
import {Profile} from "./components/Profile";
import {UpdatePanel} from "./components/UpdatePanel";
import {OrderDetails} from "./components/OrderDetails";
import {OrdersPanel} from "./components/OrdersPanel";
import {Contact} from "./components/Contact";
import {About} from "./components/About";
import {CategoriesBar} from "./components/CategoriesBar";
import { NotFound } from './components/NotFound';
import {ControlMainPage} from "./components/admin/ControlMainPage";
import {useDispatch, useSelector} from "react-redux";
import {RootStateIsLogged} from "./redux/reducers/loginReducers";
import {NavigationWrapper} from "./components/utility/NavigationWrapper";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {setIsLogged} from "./redux/actions/loginActions";
import {setCategoriesPathMap} from "./redux/actions/pathActions"
import auth from "./actions/auth"
import client from './services/api'
import {EntireListOfProductsPage} from "./components/EntireListOfProdutsPage"
import categories from './actions/categories';
import {ProductsDetails} from "./components/ProductDetails";
import {useParams} from "react-router";

interface CategoryInObject{
    id : number,
    name : string,
    parentId : number
}

function App() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [categoryRoutes, setCategoryRoutes] = useState(<></>);


    useEffect(()=>{

        categories.getAllFilteredRawParams("?limit=1000").then((response)=>{
            let mapOfCategoriesPaths : Map<number, string> = new Map;

            let categoriesInArray: CategoryInObject[] = response.data.content;
            //console.log(categoriesInArray)
            let arrayOfCategoryRoutes = categoriesInArray.map((element, index)=> {

                let properPath: string = "/" + element.name.replaceAll(" ", "-");
                let temp: CategoryInObject = element;
                for(let i: number = 0; i < 15; i ++ ){  //15 is hardcoded max lenght of path in one line
                    let foundParentFlag: boolean = false;
                    for(let j: number = 0; j < categoriesInArray.length; j ++ ){
                        if(categoriesInArray[j].id === temp.parentId){
                            foundParentFlag = true;
                            temp = categoriesInArray[j];
                            break;
                        }
                    }
                    if(!foundParentFlag){
                        break;
                    }
                    properPath = "/" + temp.name.replaceAll(" ", "-") + properPath;
                    properPath = properPath.toLowerCase();

                }

                //console.log(properPath)
             mapOfCategoriesPaths.set(element.id, properPath);
             return <Route path={properPath} key={element.id} element={<NavigationWrapper loginRequired="false"><EntireListOfProductsPage id={element.id}/></NavigationWrapper>}/> 
            });

            //console.log(arrayOfCategoryRoutes)

           // console.log(mapOfCategoriesPaths)

            let coerceMapToObject = Object.fromEntries(mapOfCategoriesPaths);
            dispatch(setCategoriesPathMap(coerceMapToObject));
            setCategoryRoutes (<>{arrayOfCategoryRoutes}</>);
        }).catch((e)=>{
  
        })
    },[])



    let DefaultRoutes = () => {
        return (
            <div className={classes.app}>
                <Navbar/>
                <CategoriesBar />
                <Routes>
                    <Route path="/" element={<NavigationWrapper loginRequired="false"><HomePage/></NavigationWrapper>}/>
                    <Route path="/cart" element={<NavigationWrapper loginRequired="false"><ShoppingCart/></NavigationWrapper>}/>
                    <Route path="/profile" element={<NavigationWrapper loginRequired="true"> <Profile/> </NavigationWrapper>}/>
                    <Route path="/profile/update" element={<NavigationWrapper loginRequired="true"><UpdatePanel/></NavigationWrapper>}/>
                    <Route path="/profile/orders" element={<NavigationWrapper loginRequired="true"><OrdersPanel/></NavigationWrapper>}/>
                    <Route path="/profile/orders/:id" element={<NavigationWrapper loginRequired="true"><OrderDetails/></NavigationWrapper>}/>
                    <Route path="/control" element={<NavigationWrapper loginRequired="true"><ControlMainPage/></NavigationWrapper>} />
                    <Route path="/contact" element={<NavigationWrapper loginRequired="false"><Contact/></NavigationWrapper>}/>
                    <Route path="/about" element={<NavigationWrapper loginRequired="false"><About/></NavigationWrapper>}/>
                    <Route path="/pr-:name-:id" element={<NavigationWrapper loginRequired="false"><ProductsDetails/></NavigationWrapper>}/>
                    {categoryRoutes}
                    {/* <Route path="/:category" element={<NavigationWrapper loginRequired="false"><EntireListOfProductsPage id={1}/></NavigationWrapper>}/> */}

                    {/* <Route path="/*" element={<NavigationWrapper loginRequired="false"><NotFound/></NavigationWrapper>}/> */}
                </Routes>
            </div>
        );
    };

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPanel/>}/>
            <Route path="*" element={DefaultRoutes()} />
        </Routes>
    );

}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateGroup } from "./pages/createGroup";
import { GroupDetail } from "./pages/groupDetail";
import { GroupListMenu } from "./pages/groupListMenu";
import { Home } from "./pages/home";
import { Join } from "./pages/join";
import { Login } from "./pages/login";
import { MyGroups } from "./pages/myGroups";
import { Register } from "./pages/register";
import { Settings } from "./pages/settings";
import { Wallet } from "./pages/wallet";

export function App(){
    return(
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<h1>404</h1>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/dashboard" element={<GroupListMenu/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/my-groups" element={<MyGroups/>}/>
                    <Route path="/group/:id" element={<GroupDetail/>}/>
                    <Route path="/join/:id" element={<Join/>}/>
                    <Route path="/create-group" element={<CreateGroup/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/wallet" element={<Wallet/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
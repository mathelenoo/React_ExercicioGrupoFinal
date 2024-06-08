import React from "react";
import Home from "../pages/Home";
import Resumo from "../pages/Resumo";
import Adicionar from "../pages/Adicionar";
import { Route, Routes } from "react-router-dom";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resumo/:id" element={<Resumo />} />
            <Route path="/adicionar" element={<Adicionar />} />
        </Routes>
    );
}

export default AppRouter;

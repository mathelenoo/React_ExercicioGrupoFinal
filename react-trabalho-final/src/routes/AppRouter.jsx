import React from "react";
import Home from "../pages/Home";
import Resumo from "../pages/Resumo";
import Adicionar from "../pages/Adicionar";
import { Route, Routes } from "react-router-dom";
import Editar from "../pages/Editar";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resumo/:id" element={<Resumo />} />
            <Route path="/adicionar" element={<Adicionar />} />
            <Route path="/editar/:id" element={<Editar />} />
        </Routes>
    );
}

export default AppRouter;

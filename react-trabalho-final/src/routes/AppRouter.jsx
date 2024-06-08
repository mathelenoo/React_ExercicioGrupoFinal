import React from "react";
import Resumo from "../pages/Resumo";
import { Route, Routes } from "react-router-dom";

function AppRouter() {
    return (
        <Routes>
            <Route path="/resumo/:id" element={<Resumo />} />
        </Routes>
    );
}

export default AppRouter;

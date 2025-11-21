import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { 
  Dashboard, 
  Products, 
  Categories, 
  Orders, 
  Tables, 
  Reports ,
  Users
} from '../../pages';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="tables" element={<Tables />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;

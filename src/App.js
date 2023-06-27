import React from 'react';
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import './App.css';
import Tabela from './component/tabela/tabela'
import Rotas from './component/router/router'
import {AuthProvider}from './component/pages/auth/components/contexts/auth'
function App() {
  
  return (
    <div className="App">
      <AuthProvider>
      <Rotas/>
      </AuthProvider>
    </div>
  );
}

export default App;

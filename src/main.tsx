import React from 'react';
import ReactDOM from 'react-dom/client';

import './main.css';

import '@gorules/jdm-editor/dist/style.css';

import 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json5';
import 'ace-builds/src-noconflict/mode-liquid';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/theme-chrome';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DecisionSimplePage } from './pages/decision-simple.tsx';
import { NotFoundPage } from './pages/not-found';
import LoginScreen from './pages/login.tsx';
import MyProjects from './pages/projects.tsx';
import Documents from './pages/documents.tsx';
import { ThemeContextProvider } from './context/theme.provider.tsx';

const router = createBrowserRouter([
  { path: '/login', element: <LoginScreen /> },
  {
    path: '/:id',
    element: <DecisionSimplePage />,
  },
  { path: 'projects', element: <MyProjects /> },
  { path: '/documents', element: <Documents /> },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>,
);

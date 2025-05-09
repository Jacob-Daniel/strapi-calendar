import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import { CalendarPage } from './CalendarPage';
import { SettingsProvider } from '../context/Settings';
const App = () => {
    return (_jsx(SettingsProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(CalendarPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Page.Error, {}) })] }) }));
};
export default App;

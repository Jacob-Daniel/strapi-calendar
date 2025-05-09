import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import defaultSettings from '../utils/defaultSettings';
import api from '../api';
const SettingsContext = createContext(undefined);
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                api.getSettings().then((res) => {
                    setSettings(res.data);
                });
            }
            catch (error) {
                console.error('Failed to fetch settings', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSettings().catch();
    }, []);
    const updateField = (newSetting) => {
        setSettings((prevSettings) => ({ ...prevSettings, ...newSetting }));
    };
    const saveSettings = async () => {
        setSaving(true);
        try {
            api.setSettings(settings).catch();
        }
        catch (error) {
            console.error('Failed to save settings', error);
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsx(SettingsContext.Provider, { value: { settings, updateField, saveSettings, loading, saving }, children: children }));
};
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

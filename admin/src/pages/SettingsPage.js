import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Layouts } from '@strapi/admin/strapi-admin';
import { useNotification } from '@strapi/strapi/admin';
import { Box, Button, Divider, Loader } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { Check } from '@strapi/icons';
import GeneralSettings from '../components/Settings/GeneralSettings';
import CalendarSettings from '../components/Settings/CalendarSettings';
import { SettingsProvider, useSettings } from '../context/Settings';
import { getTranslation } from '../utils/getTranslation';
const SettingsPage = () => {
    const { loading, saving, saveSettings, settings } = useSettings();
    const { toggleNotification } = useNotification();
    const { formatMessage } = useIntl();
    const submit = async () => {
        // Verify critical settings
        if (settings.defaultView === 'Month' && !settings.monthView) {
            return toggleNotification({
                type: 'warning',
                message: formatMessage({
                    id: getTranslation('warning.missing.month-view'),
                    defaultMessage: 'Month view must be enabled',
                }),
            });
        }
        if (settings.defaultView === 'Week' && !settings.weekView) {
            return toggleNotification({
                type: 'warning',
                message: formatMessage({
                    id: getTranslation('warning.missing.week-view'),
                    defaultMessage: 'Week view must be enabled',
                }),
            });
        }
        if (settings.defaultView === 'Work-Week' && !settings.workWeekView) {
            return toggleNotification({
                type: 'warning',
                message: formatMessage({
                    id: getTranslation('warning.missing.work-week-view'),
                    defaultMessage: 'Work Week view must be enabled',
                }),
            });
        }
        if (settings.defaultView === 'Day' && !settings.dayView) {
            return toggleNotification({
                type: 'warning',
                message: formatMessage({
                    id: getTranslation('warning.missing.day-view'),
                    defaultMessage: 'Day view must be enabled',
                }),
            });
        }
        if (!settings.monthView && !settings.weekView && !settings.workWeekView && !settings.dayView) {
            return toggleNotification({
                type: 'warning',
                message: formatMessage({
                    id: getTranslation('warning.missing.view'),
                    defaultMessage: 'At least one view must be enabled',
                }),
            });
        }
        saveSettings().then(() => {
            return toggleNotification({
                type: 'success',
                message: formatMessage({
                    id: getTranslation('success.update'),
                    defaultMessage: 'Settings successfully updated',
                }),
            });
        });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Layouts.Header, { title: formatMessage({
                    id: getTranslation('view.settings.title'),
                    defaultMessage: 'Calendar settings',
                }), subtitle: formatMessage({
                    id: getTranslation('view.settings.subtitle'),
                    defaultMessage: 'Configure the plugin to your needs',
                }), primaryAction: !loading && (_jsx(Button, { onClick: () => submit(), startIcon: _jsx(Check, {}), disabled: saving, loading: saving, children: formatMessage({
                        id: getTranslation('view.settings.action.save'),
                        defaultMessage: 'Save',
                    }) })) }), loading ? (_jsx(Loader, {})) : (_jsx(Layouts.Content, { children: _jsxs(Box, { background: 'neutral0', hasRadius: true, shadow: "filterShadow", paddingTop: 6, paddingBottom: 6, paddingLeft: 6, paddingRight: 6, children: [_jsx(GeneralSettings, {}), _jsx(Divider, { marginTop: 6, marginBottom: 6 }), _jsx(CalendarSettings, {})] }) }))] }));
};
const SettingsApp = () => {
    return (_jsx(SettingsProvider, { children: _jsx(SettingsPage, {}) }));
};
export default SettingsApp;

import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Layouts } from '@strapi/admin/strapi-admin';
import { Cog, Plus } from '@strapi/icons';
import tinyColor from 'tinycolor2';
import { EmptyStateLayout, LinkButton, Box, Loader } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { useTheme } from 'styled-components';
import { PLUGIN_ID } from '../pluginId';
import { getTranslation } from '../utils/getTranslation';
import Illo from '../components/Calendar/Illo';
import { useSettings } from '../context/Settings';
const CalendarPage = () => {
    const theme = useTheme();
    const { settings, loading } = useSettings();
    const { formatMessage } = useIntl();
    if (loading)
        return _jsx(Loader, {});
    if (!settings.collection) {
        return (_jsxs(_Fragment, { children: [_jsx(Layouts.Header, { title: formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Calendar' }), subtitle: formatMessage({
                        id: getTranslation('plugin.tagline'),
                        defaultMessage: 'Visualize your events',
                    }), as: "h2" }), _jsx(Layouts.Content, { children: _jsx(EmptyStateLayout, { icon: _jsx(Illo, {}), content: formatMessage({
                            id: getTranslation('view.calendar.state.empty.configure-settings.message'),
                            defaultMessage: 'Please configure the settings before accessing the calendar',
                        }), action: _jsx(LinkButton, { variant: "primary", href: `/admin/settings/${PLUGIN_ID}`, startIcon: _jsx(Cog, { color: 'white' }), children: formatMessage({
                                id: getTranslation('view.calendar.state.empty.configure-settings.action'),
                                defaultMessage: 'Settings',
                            }) }) }) })] }));
    }
    const { monthView, weekView, workWeekView, dayView, defaultView, todayButton } = settings;
    // Define the views to be displayed
    let views = '';
    if (monthView)
        views += 'dayGridMonth,';
    if (weekView)
        views += 'timeGridWeek,';
    if (workWeekView)
        views += 'workWeek,';
    if (dayView)
        views += 'dayView,';
    views = views.slice(0, -1);
    // Define the buttons to be displayed
    let left = 'prev,next' + (todayButton ? ' today' : '');
    // Define initial view
    const initialView = defaultView === 'Month'
        ? 'dayGridMonth'
        : defaultView === 'Week'
            ? 'timeGridWeek'
            : defaultView === 'Work-Week'
                ? 'workWeek'
                : defaultView === 'Day'
                    ? 'dayView'
                    : 'dayGridMonth';
    const primaryAction = settings.createButton ? (_jsx(LinkButton, { startIcon: _jsx(Plus, { color: 'white' }), href: `/admin/content-manager/collection-types/${settings.collection}/create`, children: formatMessage({ id: getTranslation('view.calendar.action.create-entry'), defaultMessage: 'Create New' }, { collection: settings.collection?.split('.')[1] }) })) : (_jsx("div", {}));
    // Override Styles
    const primaryColor = settings.primaryColor;
    const lightPrimaryColor = tinyColor(primaryColor).lighten().toString();
    const sty = `
    :root {
      --fc-page-bg-color: transparent;
      --fc-button-bg-color: ${primaryColor};
      --fc-button-active-bg-color: ${lightPrimaryColor};
      --fc-button-hover-bg-color: ${lightPrimaryColor};
      --fc-button-border-color: rgba(0, 0, 0, 0.2);
      --fc-button-active-border-color: rgba(0, 0, 0, 0.2);
    }

    .fc {
      font-size: 1.3em;
    }

    .fc-button, .fc-toolbar-title, .fc-col-header-cell-cushion {
      text-transform: capitalize !important;
    }

    .fc-toolbar-title {
      font-weight: bold !important;
    }

    .fc-button {
      padding: 0.6em 1.2em !important;
    }

    .fc-day-today {
      background-color: ${settings.primaryColor}22 !important;
    }

    .fc-timegrid-slots tr {
      height: 3.5em;
    }

    .fc-daygrid-day-frame {
      min-height: 10em !important;
    }

    .fc-daygrid-day-events a,
    .fc-daygrid-day-events a:hover,
    .fc-daygrid-day-events a:visited,
    .fc-daygrid-day-events a:active {
      color: ${theme.colors.neutral1000};
    }
  `;
    return (_jsxs(_Fragment, { children: [_jsx(Layouts.Header, { title: formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Calendar' }), subtitle: formatMessage({
                    id: getTranslation('plugin.tagline'),
                    defaultMessage: 'Visualize your events',
                }), as: "h2", primaryAction: primaryAction }), _jsx(Layouts.Content, { children: _jsxs(Box, { background: 'neutral0', shadow: "filterShadow", padding: [5, 8], hasRadius: true, style: {
                        zIndex: 0,
                        position: 'relative',
                    }, children: [_jsx("style", { children: sty }), _jsx(FullCalendar, { events: `/${PLUGIN_ID}/`, plugins: [dayGridPlugin, timeGridPlugin, listPlugin], initialView: initialView, slotMinTime: settings.startHour, slotMaxTime: settings.endHour, allDaySlot: false, views: {
                                workWeek: {
                                    type: 'timeGrid',
                                    duration: { week: 1 },
                                    hiddenDays: [0, 6, 7],
                                    buttonText: formatMessage({
                                        id: getTranslation('view.calendar.view.work-week'),
                                        defaultMessage: 'Work Week',
                                    }),
                                },
                                dayView: {
                                    type: 'timeGrid',
                                    duration: { days: 1 },
                                    buttonText: formatMessage({
                                        id: getTranslation('view.calendar.view.day'),
                                        defaultMessage: 'Day View',
                                    }),
                                },
                            }, height: 'auto', locale: formatMessage({
                                id: getTranslation('view.calendar.locale'),
                                defaultMessage: 'en-US',
                            }), headerToolbar: {
                                left,
                                center: 'title',
                                right: views,
                            } })] }) })] }));
};
export { CalendarPage };

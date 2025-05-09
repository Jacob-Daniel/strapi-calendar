import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Grid, TimePicker, Typography, Flex } from '@strapi/design-system';
import { Field, SingleSelect, SingleSelectOption, Toggle } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';
import { getTranslation } from '../../utils/getTranslation';
import { useSettings } from '../../context/Settings';
const CalendarSettings = () => {
    const { formatMessage } = useIntl();
    const { settings, updateField } = useSettings();
    const [popOver, setPopOver] = useState(null);
    return (_jsxs(Grid.Root, { gap: 4, children: [_jsx(Grid.Item, { s: 12, children: _jsx(Typography, { variant: "beta", children: formatMessage({
                        id: getTranslation('view.settings.section.calendar.title'),
                        defaultMessage: 'Calendar settings',
                    }) }) }), _jsx(Grid.Item, { s: 12, children: _jsxs(Flex, { gap: 10, children: [_jsxs(Box, { children: [_jsx(Field.Label, { children: formatMessage({
                                        id: getTranslation('view.settings.section.calendar.primary-color.title'),
                                        defaultMessage: 'Primary Color',
                                    }) }), _jsx(ColorWindow, { color: settings.primaryColor, onClick: () => setPopOver('primaryColor') }), popOver === 'primaryColor' && (_jsxs(PopOver, { children: [_jsx(Cover, { onClick: () => setPopOver(null) }), _jsx(ChromePicker, { color: settings.primaryColor, onChangeComplete: (e) => updateField({ primaryColor: e.hex }) })] }))] }), _jsxs(Box, { children: [_jsx(Field.Label, { children: formatMessage({
                                        id: getTranslation('view.settings.section.calendar.event-color.title'),
                                        defaultMessage: 'Event Color',
                                    }) }), _jsx(ColorWindow, { color: settings.eventColor, onClick: () => setPopOver('eventColor') }), popOver === 'eventColor' && (_jsxs(PopOver, { children: [_jsx(Cover, { onClick: () => setPopOver(null) }), _jsx(ChromePicker, { color: settings.eventColor, onChangeComplete: (e) => updateField({ eventColor: e.hex }) })] }))] })] }) }), _jsx(Grid.Item, { col: 6, s: 12, children: _jsxs(Field.Root, { style: { width: '100%' }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.times.start.label'),
                                defaultMessage: 'Start Hour',
                            }) }), _jsx(TimePicker, { clearLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.times.clear'),
                                defaultMessage: 'Clear Time',
                            }), step: 60, value: settings.startHour, onChange: (e) => updateField({ startHour: e }) })] }) }), _jsx(Grid.Item, { col: 6, s: 12, children: _jsxs(Field.Root, { style: { width: '100%' }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.times.end.label'),
                                defaultMessage: 'End Hour',
                            }) }), _jsx(TimePicker, { clearLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.times.clear'),
                                defaultMessage: 'Clear Time',
                            }), step: 60, value: settings.endHour, onChange: (e) => updateField({ endHour: e }) })] }) }), _jsx(Grid.Item, { s: 12, children: _jsxs(Field.Root, { style: { width: '100%' }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.default-view.label'),
                                defaultMessage: 'Default View',
                            }) }), _jsxs(SingleSelect, { onChange: (e) => updateField({ defaultView: e }), value: settings.defaultView, children: [_jsx(SingleSelectOption, { value: "Month", children: formatMessage({
                                        id: getTranslation('view.settings.section.calendar.view.month'),
                                        defaultMessage: 'Month View',
                                    }) }), _jsx(SingleSelectOption, { value: "Week", children: formatMessage({
                                        id: getTranslation('view.settings.section.calendar.view.week'),
                                        defaultMessage: 'Week View',
                                    }) }), _jsx(SingleSelectOption, { value: "Work-Week", children: formatMessage({
                                        id: getTranslation('view.settings.section.calendar.view.work-week'),
                                        defaultMessage: 'Work Week View',
                                    }) }), _jsx(SingleSelectOption, { value: "Day", children: formatMessage({
                                        id: getTranslation('view.settings.section.calendar.view.day'),
                                        defaultMessage: 'Day View',
                                    }) })] })] }) }), _jsx(Grid.Item, { col: 6, s: 12, children: _jsxs(Field.Root, { style: { minWidth: 300 }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.month'),
                                defaultMessage: 'Month View',
                            }) }), _jsx(Toggle, { checked: settings.monthView, offLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.off'),
                                defaultMessage: 'Disabled',
                            }), onLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.on'),
                                defaultMessage: 'Enabled',
                            }), onChange: (e) => {
                                updateField({
                                    monthView: e.target.checked,
                                });
                            } })] }) }), _jsx(Grid.Item, { col: 6, s: 12, children: _jsxs(Field.Root, { style: { minWidth: 300 }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.week'),
                                defaultMessage: 'Week View',
                            }) }), _jsx(Toggle, { checked: settings.weekView, offLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.off'),
                                defaultMessage: 'Disabled',
                            }), onLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.on'),
                                defaultMessage: 'Enabled',
                            }), onChange: (e) => {
                                updateField({
                                    weekView: e.target.checked,
                                });
                            } })] }) }), _jsx(Grid.Item, { col: 6, s: 12, children: _jsxs(Field.Root, { style: { minWidth: 300 }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.work-week'),
                                defaultMessage: 'Work Week',
                            }) }), _jsx(Toggle, { checked: settings.workWeekView, offLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.off'),
                                defaultMessage: 'Disabled',
                            }), onLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.on'),
                                defaultMessage: 'Enabled',
                            }), onChange: (e) => {
                                updateField({
                                    workWeekView: e.target.checked,
                                });
                            } })] }) }), _jsx(Grid.Item, { col: 6, s: 12, children: _jsxs(Field.Root, { style: { minWidth: 300 }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.day'),
                                defaultMessage: 'Day View',
                            }) }), _jsx(Toggle, { checked: settings.dayView, offLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.off'),
                                defaultMessage: 'Disabled',
                            }), onLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.view.on'),
                                defaultMessage: 'Enabled',
                            }), onChange: (e) => {
                                updateField({
                                    dayView: e.target.checked,
                                });
                            } })] }) }), _jsx(Grid.Item, { col: 6, s: 12, children: _jsxs(Field.Root, { style: { minWidth: 300 }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.button.create.label'),
                                defaultMessage: 'Create Button',
                            }) }), _jsx(Toggle, { checked: settings.createButton, offLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.button.off'),
                                defaultMessage: 'Disabled',
                            }), onLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.button.on'),
                                defaultMessage: 'Enabled',
                            }), onChange: (e) => {
                                updateField({
                                    createButton: e.target.checked,
                                });
                            } })] }) }), _jsx(Grid.Item, { col: 6, s: 12, children: _jsxs(Field.Root, { style: { minWidth: 300 }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.calendar.button.today.label'),
                                defaultMessage: 'Today Button',
                            }) }), _jsx(Toggle, { checked: settings.todayButton, offLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.button.off'),
                                defaultMessage: 'Disabled',
                            }), onLabel: formatMessage({
                                id: getTranslation('view.settings.section.calendar.button.on'),
                                defaultMessage: 'Enabled',
                            }), onChange: (e) => {
                                updateField({
                                    todayButton: e.target.checked,
                                });
                            } })] }) })] }));
};
const ColorWindow = styled.div `
  background-color: ${(props) => props.color};
  border: ${(props) => props.color === '#FFFFFF' && '1px solid #5B5F65'};
  width: 3rem;
  height: 3rem;
  border-radius: 10%;
  cursor: pointer;
`;
const PopOver = styled.div `
  position: absolute;
  margin-top: 10px;
  z-index: 10;
`;
const Cover = styled.div `
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export default CalendarSettings;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Grid, Typography } from '@strapi/design-system';
import { Field, SingleSelect, SingleSelectOption, Toggle } from '@strapi/design-system';
import api from '../../api';
import { getTranslation } from '../../utils/getTranslation';
import { useSettings } from '../../context/Settings';
const GeneralSettings = () => {
    const { formatMessage } = useIntl();
    const { updateField, settings } = useSettings();
    const [collections, setCollections] = useState([]);
    const [extensions, setExtensions] = useState([]);
    const [fields, setFields] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [collectionsRes, extensionsRes] = await Promise.all([
                    api.getCollections(),
                    api.getExtensions(),
                ]);
                setCollections(collectionsRes.data);
                setExtensions(extensionsRes.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().catch();
    }, []);
    useEffect(() => {
        if (settings.collection && collections.length) {
            const collection = collections.find((x) => x.uid === settings.collection);
            if (!collection)
                return;
            const fields = Object.entries(collection.attributes)
                .map((x) => ({
                id: x[0],
                type: x[1].type,
            }))
                .concat(extensions.reduce((acc, el) => {
                // TODO: Fix TS error
                // @ts-ignore
                acc.push(...el.startFields, ...el.endFields);
                return acc;
            }, []));
            setFields(fields);
        }
    }, [settings, collections, extensions]);
    return (_jsxs(Grid.Root, { gap: 4, children: [_jsx(Grid.Item, { s: 12, children: _jsx(Typography, { variant: "beta", children: formatMessage({
                        id: getTranslation('view.settings.section.general.title'),
                        defaultMessage: 'General settings',
                    }) }) }), _jsx(Grid.Item, { s: 6, children: _jsxs(Field.Root, { style: { width: '100%' }, required: true, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.general.collection.label'),
                                defaultMessage: 'Choose your collection',
                            }) }), _jsx(SingleSelect, { onChange: (e) => updateField({ collection: e }), value: settings.collection, children: collections.map((x) => (_jsx(SingleSelectOption, { value: x.uid, children: x.collectionName }, x.uid))) })] }) }), _jsx(Grid.Item, { s: 6, children: _jsxs(Field.Root, { style: { width: '100%' }, required: true, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.general.title.label'),
                                defaultMessage: 'Choose your title field',
                            }) }), _jsxs(SingleSelect, { onChange: (e) => updateField({ titleField: e }), value: settings.titleField, children: [_jsx(SingleSelectOption, { value: "", children: formatMessage({
                                        id: getTranslation('view.settings.section.general.title.none'),
                                        defaultMessage: 'No title field',
                                    }) }), fields
                                    .filter((x) => x.type === 'string')
                                    .map((x) => (_jsx(SingleSelectOption, { value: x.id, children: x.id }, x.id)))] })] }) }), _jsx(Grid.Item, { col: 3, s: 12, children: _jsxs(Field.Root, { style: { width: '100%' }, required: true, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.general.start.label'),
                                defaultMessage: 'Choose your start field',
                            }) }), _jsxs(SingleSelect, { onChange: (e) => updateField({ startField: e }), value: settings.startField, children: [_jsx(SingleSelectOption, { value: "", children: formatMessage({
                                        id: getTranslation('view.settings.section.general.start.none'),
                                        defaultMessage: 'No start field',
                                    }) }), fields
                                    .filter((x) => x.type === 'datetime')
                                    .map((x) => (_jsx(SingleSelectOption, { value: x.id, children: x.id }, x.id)))] })] }) }), _jsx(Grid.Item, { col: 3, s: 12, children: _jsxs(Field.Root, { style: { width: '100%' }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.general.end.label'),
                                defaultMessage: 'Choose your end field',
                            }) }), _jsxs(SingleSelect, { onChange: (e) => updateField({ endField: e }), value: settings.endField, children: [_jsx(SingleSelectOption, { value: "", children: formatMessage({
                                        id: getTranslation('view.settings.section.general.end.none'),
                                        defaultMessage: 'No end field',
                                    }) }), fields
                                    .filter((x) => x.type === 'datetime')
                                    .map((x) => (_jsx(SingleSelectOption, { value: x.id, children: x.id }, x.id)))] })] }) }), _jsx(Grid.Item, { col: 3, s: 12, children: _jsxs(Field.Root, { style: { width: '100%' }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.general.duration.label'),
                                defaultMessage: 'Choose your default event duration',
                            }) }), _jsxs(SingleSelect, { onChange: (e) => updateField({ defaultDuration: Number(e) }), value: settings.defaultDuration, children: [_jsx(SingleSelectOption, { value: "30", children: formatMessage({
                                        id: getTranslation('view.settings.section.general.duration.30m'),
                                        defaultMessage: '30 Minutes',
                                    }) }), _jsx(SingleSelectOption, { value: "60", children: formatMessage({
                                        id: getTranslation('view.settings.section.general.duration.1h'),
                                        defaultMessage: '1 Hour',
                                    }) }), _jsx(SingleSelectOption, { value: "90", children: formatMessage({
                                        id: getTranslation('view.settings.section.general.duration.1.5h'),
                                        defaultMessage: '1.5 Hours',
                                    }) }), _jsx(SingleSelectOption, { value: "120", children: formatMessage({
                                        id: getTranslation('view.settings.section.general.duration.2h'),
                                        defaultMessage: '2 Hours',
                                    }) })] })] }) }), _jsx(Grid.Item, { col: 3, s: 12, children: _jsxs(Field.Root, { style: { width: '100%' }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.general.color.label'),
                                defaultMessage: 'Choose your color field',
                            }) }), _jsxs(SingleSelect, { onChange: (e) => updateField({ colorField: e }), value: settings.colorField, children: [_jsx(SingleSelectOption, { value: "", children: formatMessage({
                                        id: getTranslation('view.settings.section.general.color.none'),
                                        defaultMessage: 'No color field',
                                    }) }), fields
                                    .filter((x) => x.type === 'string')
                                    .map((x) => (_jsx(SingleSelectOption, { value: x.id, children: x.id }, x.id)))] })] }) }), _jsx(Grid.Item, { s: 12, children: _jsxs(Field.Root, { style: { minWidth: 300 }, children: [_jsx(Field.Label, { children: formatMessage({
                                id: getTranslation('view.settings.section.general.drafts.label'),
                                defaultMessage: 'Display drafts',
                            }) }), _jsx(Toggle, { checked: settings.drafts, offLabel: formatMessage({
                                id: getTranslation('view.settings.section.general.display-drafts.off'),
                                defaultMessage: 'Disabled',
                            }), onLabel: formatMessage({
                                id: getTranslation('view.settings.section.general.display-drafts.on'),
                                defaultMessage: 'Enabled',
                            }), onChange: (e) => {
                                updateField({
                                    drafts: e.target.checked,
                                });
                            } })] }) })] }));
};
export default GeneralSettings;

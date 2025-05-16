import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
	Grid,
	Typography,
	Field,
	SingleSelect,
	SingleSelectOption,
	Toggle,
	TextInput,
	Button,
	Flex,
	Box,
} from '@strapi/design-system';
import { Struct } from '@strapi/strapi';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

import api from '../../api';
import { getTranslation } from '../../utils/getTranslation';
import { useSettings } from '../../context/Settings';
import { CollectionFilter, ExtensionType, SettingsType } from '../../../../types';
const GeneralSettings = () => {
	const { formatMessage } = useIntl();
	const { updateField, settings } = useSettings();
	const [collections, setCollections] = useState<Array<Struct.BaseSchema>>([]);
	const [extensions, setExtensions] = useState<Array<ExtensionType>>([]);
	const [fields, setFields] = useState<Array<{ id: string; type: string }>>([]);
	const [filters, setFilters] = useState<SettingsType['collectionFilters']>([]);
	const [collectionFields, setCollectionFields] = useState<CollectionFilter[]>([]);
	const [collectionStatuses, setCollectionStatuses] = useState<SettingsType['eventStatus']>([]);
	const [popOver, setPopover] = useState<string | null>(null);
	const [eventStatus, setEventStatus] = useState<
		{
			field: string | null;
			value: string | null;
			color: string | null;
		}[]
	>(settings.eventStatus);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [collectionsRes, extensionsRes] = await Promise.all([
					api.getCollections(),
					api.getExtensions(),
				]);
				setCollections(collectionsRes.data);
				setExtensions(extensionsRes.data);
			} catch (error) {
				console.error('Error fetching collections/extensions:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (!settings.collection || !collections.length) return;

		const collection = collections.find((x) => x.uid === settings.collection);
		if (!collection) return;

		const baseFields = Object.entries(collection.attributes).map(([id, attr]) => ({
			id,
			type: attr.type,
		}));

		const extensionFields = extensions.reduce((acc, el) => {
			// @ts-ignore
			acc.push(...el.startFields, ...el.endFields);
			return acc;
		}, []);

		setFields([...baseFields, ...extensionFields]);

		api.getCollectionFilters(settings.collection).then((response) => {
			setCollectionFields(response.data || []);
		});
	}, [settings.collection, collections, extensions, settings.eventStatus]);

	useEffect(() => {
		api.getCollectionStatuses(settings.collection).then((response) => {
			setCollectionStatuses(response.data || []);
		});
		setFilters(settings.collectionFilters || []);
	}, [settings.collectionFilters, settings.collection]);

	const addFilter = () => {
		setFilters((prev) => {
			const updated = [...prev, { field: '', operator: 'eq', value: '' }];
			updateField({ collectionFilters: updated });
			return updated;
		});
	};

	const updateFilter = (index: number, key: string, value: string) => {
		const newFilters = [...filters];
		newFilters[index] = { ...newFilters[index], [key]: value };
		setFilters(newFilters);
		updateField({ collectionFilters: newFilters.length ? newFilters : [] });
	};

	const removeFilter = (index: number) => {
		const newFilters = filters.filter((_, i) => i !== index);
		setFilters(newFilters);
		updateField({ collectionFilters: newFilters.length ? newFilters : [] });
	};
	return (
		<Grid.Root gap={4}>
			<Grid.Item s={12}>
				<Typography variant="beta">
					{formatMessage({
						id: getTranslation('view.settings.section.general.title'),
						defaultMessage: 'General settings',
					})}
				</Typography>
			</Grid.Item>
			<Grid.Item s={6}>
				<Field.Root style={{ width: '100%' }} required>
					<Field.Label>
						{formatMessage({
							id: getTranslation('view.settings.section.general.collection.label'),
							defaultMessage: 'Choose your collection',
						})}
					</Field.Label>
					<SingleSelect
						placeholder={settings.collection}
						onChange={(e: string) => updateField({ collection: e })}
						value={settings.collection}
						onCloseAutoFocus={(e) => e.preventDefault()}
					>
						{collections.map((x) => (
							<SingleSelectOption key={x.uid} value={x.uid}>
								{x.collectionName}
							</SingleSelectOption>
						))}
					</SingleSelect>
				</Field.Root>
			</Grid.Item>
			<Grid.Item s={6}>
				<Field.Root style={{ width: '100%' }} required>
					<Field.Label>
						{formatMessage({
							id: getTranslation('view.settings.section.general.title.label'),
							defaultMessage: 'Choose your title field',
						})}
					</Field.Label>
					<SingleSelect
						placeholder={settings.titleField}
						onChange={(e: string) => updateField({ titleField: e })}
						value={settings.titleField}
						onCloseAutoFocus={(e) => e.preventDefault()}
					>
						<SingleSelectOption value="">
							{formatMessage({
								id: getTranslation('view.settings.section.general.title.none'),
								defaultMessage: 'No title field',
							})}
						</SingleSelectOption>
						{fields
							.filter((x) => x.type === 'string')
							.map((x) => (
								<SingleSelectOption key={x.id} value={x.id}>
									{x.id}
								</SingleSelectOption>
							))}
					</SingleSelect>
				</Field.Root>
			</Grid.Item>

			<Grid.Item col={3} s={12}>
				<Field.Root style={{ width: '100%' }} required>
					<Field.Label>
						{formatMessage({
							id: getTranslation('view.settings.section.general.start.label'),
							defaultMessage: 'Choose your start field',
						})}
					</Field.Label>
					<SingleSelect
						placeholder={settings.startField}
						on
						onChange={(e: string) => updateField({ startField: e })}
						value={settings.startField}
					>
						<SingleSelectOption value="">
							{formatMessage({
								id: getTranslation('view.settings.section.general.start.none'),
								defaultMessage: 'No start field',
							})}
						</SingleSelectOption>
						{fields
							.filter((x) => x.type === 'datetime' || x.type === 'date')
							.map((x) => (
								<SingleSelectOption key={x.id} value={x.id}>
									{x.id}
								</SingleSelectOption>
							))}
					</SingleSelect>
				</Field.Root>
			</Grid.Item>

			<Grid.Item col={3} s={12}>
				<Field.Root style={{ width: '100%' }}>
					<Field.Label>
						{formatMessage({
							id: getTranslation('view.settings.section.general.end.label'),
							defaultMessage: 'Choose your end field',
						})}
					</Field.Label>
					<SingleSelect
						placeholder={settings.endField}
						onChange={(e: string) => updateField({ endField: e })}
						value={settings.endField}
					>
						<SingleSelectOption value="">
							{formatMessage({
								id: getTranslation('view.settings.section.general.end.none'),
								defaultMessage: 'No end field',
							})}
						</SingleSelectOption>
						{fields
							.filter((x) => x.type === 'datetime' || x.type === 'date')
							.map((x) => (
								<SingleSelectOption key={x.id} value={x.id}>
									{x.id}
								</SingleSelectOption>
							))}
					</SingleSelect>
				</Field.Root>
			</Grid.Item>

			<Grid.Item col={3} s={12}>
				<Field.Root style={{ width: '100%' }}>
					<Field.Label>
						{formatMessage({
							id: getTranslation('view.settings.section.general.duration.label'),
							defaultMessage: 'Choose your default event duration',
						})}
					</Field.Label>
					<SingleSelect
						placeholder={'D'}
						onChange={(e: string) => updateField({ defaultDuration: Number(e) })}
						value={settings.defaultDuration}
						onCloseAutoFocus={(e) => e.preventDefault()} // Add this
					>
						<SingleSelectOption value="30">
							{formatMessage({
								id: getTranslation('view.settings.section.general.duration.30m'),
								defaultMessage: '30 Minutes',
							})}
						</SingleSelectOption>
						<SingleSelectOption value="60">
							{formatMessage({
								id: getTranslation('view.settings.section.general.duration.1h'),
								defaultMessage: '1 Hour',
							})}
						</SingleSelectOption>
						<SingleSelectOption value="90">
							{formatMessage({
								id: getTranslation('view.settings.section.general.duration.1.5h'),
								defaultMessage: '1.5 Hours',
							})}
						</SingleSelectOption>
						<SingleSelectOption value="120">
							{formatMessage({
								id: getTranslation('view.settings.section.general.duration.2h'),
								defaultMessage: '2 Hours',
							})}
						</SingleSelectOption>
						<SingleSelectOption value="1440">
							{formatMessage({
								id: getTranslation('view.settings.section.general.duration.24h'),
								defaultMessage: '24 Hours',
							})}
						</SingleSelectOption>
					</SingleSelect>
				</Field.Root>
			</Grid.Item>

			<Grid.Item col={3} s={12}>
				<Field.Root style={{ width: '100%' }}>
					<Field.Label>
						{formatMessage({
							id: getTranslation('view.settings.section.general.color.label'),
							defaultMessage: 'Choose your color field',
						})}
					</Field.Label>
					<SingleSelect
						placeholder={settings.colorField}
						onChange={(e: string) => updateField({ colorField: e })}
						value={settings.colorField}
						onCloseAutoFocus={(e) => e.preventDefault()} // Add this
					>
						<SingleSelectOption value="">
							{formatMessage({
								id: getTranslation('view.settings.section.general.color.none'),
								defaultMessage: 'No color field',
							})}
						</SingleSelectOption>
						{fields
							.filter((x) => ['string', 'enumeration'].includes(x.type))
							.map((x) => (
								<SingleSelectOption key={x.id} value={x.id}>
									{x.id}
								</SingleSelectOption>
							))}
					</SingleSelect>
				</Field.Root>
			</Grid.Item>

			<Grid.Item s={12}>
				<Field.Root style={{ minWidth: 300 }}>
					<Field.Label>
						{formatMessage({
							id: getTranslation('view.settings.section.general.drafts.label'),
							defaultMessage: 'Display drafts',
						})}
					</Field.Label>
					<Toggle
						checked={settings.drafts}
						offLabel={formatMessage({
							id: getTranslation('view.settings.section.general.display-drafts.off'),
							defaultMessage: 'Disabled',
						})}
						onLabel={formatMessage({
							id: getTranslation('view.settings.section.general.display-drafts.on'),
							defaultMessage: 'Enabled',
						})}
						onChange={(e: any) => {
							updateField({
								drafts: e.target.checked,
							});
						}}
					/>
				</Field.Root>
			</Grid.Item>
			<Grid.Item s={12}>
				<Typography variant="beta">
					{formatMessage({
						id: 'view.settings.section.general.filters-title',
						defaultMessage: 'Collection Filters',
					})}
				</Typography>
			</Grid.Item>
			{filters.map((filter, index) => (
				<React.Fragment key={index}>
					<Grid.Item s={4}>
						<Field.Root>
							<Field.Label>
								{formatMessage({
									id: 'view.settings.section.general.filters-field',
									defaultMessage: 'Field',
								})}
							</Field.Label>
							<SingleSelect
								placeholder={filter.field}
								value={filter.field}
								onChange={(e) => updateFilter(index, 'field', e)}
								onCloseAutoFocus={(e) => e.preventDefault()}
							>
								<SingleSelectOption value="">
									{formatMessage({
										id: 'view.settings.section.general.filters-field-placeholder',
										defaultMessage: 'Select field',
									})}
								</SingleSelectOption>
								{collectionFields.map((field) => (
									<SingleSelectOption key={field.name} value={field.name}>
										{field.name}
									</SingleSelectOption>
								))}
							</SingleSelect>
						</Field.Root>
					</Grid.Item>

					<Grid.Item s={3}>
						<Field.Root>
							<Field.Label>
								{formatMessage({
									id: 'view.settings.section.general.filters-operator',
									defaultMessage: 'Operator',
								})}
							</Field.Label>
							<SingleSelect
								value={filter.operator}
								onChange={(e) => updateFilter(index, 'operator', e)}
								disabled={!filter.field}
								onCloseAutoFocus={(e) => e.preventDefault()}
							>
								{filter.field &&
									collectionFields
										.find((f) => f.name === filter.field)
										?.filterOperators.map((op) => (
											<SingleSelectOption key={op} value={op}>
												{formatMessage({
													id: `operator.${op}`,
													defaultMessage: op,
												})}
											</SingleSelectOption>
										))}
							</SingleSelect>
						</Field.Root>
					</Grid.Item>

					<Grid.Item s={4}>
						<Field.Root>
							<Field.Label>
								{formatMessage({
									id: 'view.settings.section.general.filters-value',
									defaultMessage: 'Value',
								})}
							</Field.Label>
							<TextInput
								value={filter.value}
								onChange={(e) => updateFilter(index, 'value', e.target.value)}
								placeholder={formatMessage({
									id: 'view.settings.section.general.filters-value-placeholder',
									defaultMessage: 'Enter value',
								})}
							/>
						</Field.Root>
					</Grid.Item>

					<Grid.Item s={1} style={{ display: 'flex', alignItems: 'flex-end' }}>
						<Button variant="danger" onClick={() => removeFilter(index)}>
							{formatMessage({
								id: 'view.settings.section.general.filters-remove',
								defaultMessage: 'Remove',
							})}
						</Button>
					</Grid.Item>
				</React.Fragment>
			))}

			<Grid.Item s={12}>
				<Button onClick={addFilter}>
					{formatMessage({
						id: 'view.settings.section.general.filters-add',
						defaultMessage: 'Add Filter',
					})}
				</Button>
			</Grid.Item>
			<Grid.Item s={12}>
				<Typography variant="beta">
					{formatMessage({
						id: getTranslation('view.settings.section.calendar.event-status-color.title'),
						defaultMessage: 'Event Status Color',
					})}
				</Typography>
			</Grid.Item>
			<Grid.Item col={3} s={12}>
				<Field.Root style={{ width: '100%' }} required>
					<Flex gap={10}>
						{collectionStatuses &&
							collectionStatuses.map((status) => {
								const existing = settings.eventStatus?.find(
									(s) => s.field === settings.colorField && s.value === status.value
								);

								return (
									<Box key={status.value}>
										<Field.Label>{status.value}</Field.Label>

										<ColorWindow
											color={existing?.color || settings.eventColor}
											onClick={() =>
												setPopover((current) => (current === status.value ? null : status.value))
											}
										/>

										{popOver === status.value && (
											<PopOver>
												<Cover onClick={() => setPopover(null)} />
												<ChromePicker
													color={existing?.color || settings.eventColor}
													onChangeComplete={(e) => {
														const updated = [
															...(settings.eventStatus ?? []).filter(
																(s) =>
																	!(s.field === settings.colorField && s.value === status.value)
															),
															{
																field: settings.colorField!,
																value: status.value!,
																color: e.hex,
															},
														];
														updateField({ eventStatus: updated });
														setPopover(null);
													}}
												/>
											</PopOver>
										)}
									</Box>
								);
							})}
					</Flex>
				</Field.Root>
			</Grid.Item>
			<Grid.Item s={12}></Grid.Item>
		</Grid.Root>
	);
};

const ColorWindow = styled.div`
	background-color: ${(props) => props.color};
	border: ${(props) => props.color === '#FFFFFF' && '1px solid #5B5F65'};
	width: 3rem;
	height: 3rem;
	border-radius: 10%;
	cursor: pointer;
`;

const PopOver = styled.div`
	position: absolute;
	margin-top: 10px;
	z-index: 10;
`;

const Cover = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

export default GeneralSettings;

import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  DeleteButton,
  Edit,
  Create,
  Show,
  SimpleShowLayout,
  SimpleForm,
  TextInput,
  DateTimeInput,
  NumberInput,
  DateInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  ReferenceField,
  Filter,
  required,
  useRecordContext,
  TopToolbar,
  EditButton,
  ListButton,
} from 'react-admin';

const SessionTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `Session : ${record.title}` : ''}</span>;
};

const SessionFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="title" label="Titre" alwaysOn />
    <ReferenceInput source="event_id" reference="events" label="Événement">
      <SelectInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput source="room_id" reference="rooms" label="Salle">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <DateInput source="start_time" label="Date de début" />
  </Filter>
);

export const SessionList = () => (
  <List filters={<SessionFilter />} sort={{ field: 'start_time', order: 'ASC' }}>
    <Datagrid rowClick="show">
      <TextField source="title" label="Titre" />
      <ReferenceField source="room_id" reference="rooms" label="Salle">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="start_time" label="Début" showTime />
      <DateField source="end_time" label="Fin" showTime />
      <NumberField source="capacity" label="Capacité" />
      <DeleteButton />
    </Datagrid>
  </List>
);
const SessionForm = () => (
  <SimpleForm>
    <ReferenceInput source="event_id" reference="events" label="Événement">
      <SelectInput optionText="title" validate={required()} fullWidth />
    </ReferenceInput>
    <TextInput source="title" label="Titre" validate={required()} fullWidth />
    <TextInput source="description" label="Description" multiline rows={3} fullWidth />
    <DateTimeInput source="start_time" label="Heure de début" validate={required()} />
    <DateTimeInput source="end_time" label="Heure de fin" validate={required()} />
    <ReferenceInput source="room_id" reference="rooms" label="Salle">
      <SelectInput optionText="name" fullWidth />
    </ReferenceInput>
    <NumberInput source="capacity" label="Capacité (informatif)" defaultValue={0} />
    <ReferenceArrayInput source="speaker_ids" reference="speakers" label="Intervenants">
      <SelectArrayInput optionText="full_name" fullWidth />
    </ReferenceArrayInput>
  </SimpleForm>
);

export const SessionCreate = () => (
  <Create title="Créer une session">
    <SessionForm />
  </Create>
);

const SessionShowActions = () => (
  <TopToolbar>
    <ListButton label="Retour" />
    <EditButton />
  </TopToolbar>
);

const SessionEditActions = () => (
  <TopToolbar>
    <ListButton label="Retour" />
  </TopToolbar>
);

export const SessionShow = () => (
  <Show title={<SessionTitle />} actions={<SessionShowActions />}>
    <SimpleShowLayout>
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <ReferenceField source="event_id" reference="events" label="Événement">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="room_id" reference="rooms" label="Salle">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="start_time" label="Heure de début" showTime />
      <DateField source="end_time" label="Heure de fin" showTime />
      <NumberField source="capacity" label="Capacité" />
      <ReferenceArrayField source="speaker_ids" reference="speakers" label="Intervenants">
        <SingleFieldList>
          <ChipField source="full_name" />
        </SingleFieldList>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
);

export const SessionEdit = () => (
  <Edit title={<SessionTitle />} actions={<SessionEditActions />}>
    <SessionForm />
  </Edit>
);

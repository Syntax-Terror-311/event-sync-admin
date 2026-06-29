import {
  List, Datagrid, TextField, DateField, NumberField, EditButton, DeleteButton,
  Edit, Create, SimpleForm, TextInput, DateTimeInput, NumberInput,
  ReferenceInput, SelectInput, ReferenceArrayInput, SelectArrayInput, required,ReferenceField
} from 'react-admin';

export const SessionList = () => (
  <List sort={{ field: 'start_time', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Titre" />
      <ReferenceField source="room_id" reference="rooms" label="Salle">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="start_time" label="Début" showTime />
      <DateField source="end_time" label="Fin" showTime />
      <NumberField source="capacity" label="Capacité" />
      <EditButton />
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

export const SessionEdit = () => (
  <Edit title="Modifier la session">
    <SessionForm />
  </Edit>
);

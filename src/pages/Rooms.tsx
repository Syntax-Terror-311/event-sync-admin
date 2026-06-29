import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  ReferenceField,
} from 'react-admin';

export const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nom" />
      <ReferenceField source="event_id" reference="events" label="Événement">
        <TextField source="title" />
      </ReferenceField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const RoomForm = () => (
  <SimpleForm>
    <TextInput source="name" label="Nom de la salle" validate={required()} fullWidth />
    <ReferenceInput source="event_id" reference="events" label="Événement">
      <SelectInput optionText="title" validate={required()} fullWidth />
    </ReferenceInput>
  </SimpleForm>
);

export const RoomCreate = () => (
  <Create title="Créer une salle">
    <RoomForm />
  </Create>
);

export const RoomEdit = () => (
  <Edit title="Modifier la salle">
    <RoomForm />
  </Edit>
);

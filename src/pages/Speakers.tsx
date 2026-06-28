import {
  List, Datagrid, TextField, EditButton, DeleteButton,
  Edit, Create, SimpleForm, TextInput, required,
  ImageField, ImageInput,
} from 'react-admin';

export const SpeakerList = () => (
  <List sort={{ field: 'full_name', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="full_name" label="Nom" />
      <TextField source="twitter" label="Twitter" />
      <TextField source="linkedin" label="LinkedIn" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const SpeakerForm = () => (
  <SimpleForm>
    <TextInput source="full_name" label="Nom complet" validate={required()} fullWidth />
    <TextInput source="photo_url" label="URL photo de profil" fullWidth />
    <TextInput source="bio" label="Biographie" multiline rows={4} fullWidth />
    <TextInput source="twitter" label="Twitter (@handle)" fullWidth />
    <TextInput source="linkedin" label="LinkedIn (URL)" fullWidth />
    <TextInput source="website" label="Site web" fullWidth />
  </SimpleForm>
);

export const SpeakerCreate = () => (
  <Create title="Ajouter un intervenant">
    <SpeakerForm />
  </Create>
);

export const SpeakerEdit = () => (
  <Edit title="Modifier l'intervenant">
    <SpeakerForm />
  </Edit>
);

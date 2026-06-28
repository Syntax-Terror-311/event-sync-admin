import {
  List, Datagrid, TextField, DateField, EditButton, DeleteButton,
  Edit, Create, SimpleForm, TextInput, DateTimeInput, required,
  Show, SimpleShowLayout,useNotify, useRedirect
} from 'react-admin';

export const EventList = () => (
  <List sort={{ field: 'start_date', order: 'DESC' }}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Titre" />
      <TextField source="location" label="Lieu" />
      <DateField source="start_date" label="Début" showTime />
      <DateField source="end_date" label="Fin" showTime />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const EventForm = () => (
  <SimpleForm>
    <TextInput source="title" label="Titre" validate={required()} fullWidth />
    <TextInput source="description" label="Description" multiline rows={4} fullWidth />
    <TextInput source="location" label="Lieu" fullWidth />
    <DateTimeInput source="start_date" label="Date de début" validate={required()} />
    <DateTimeInput source="end_date" label="Date de fin" validate={required()} />
  </SimpleForm>
);

export const EventCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  return (
    <Create
    title="Créer un événement"
    mutationOptions={{
      onSuccess: () => {
        notify('Événement créé avec succès !');
        redirect('/events');
      },
    }}
    >
      <EventForm />
    </Create>
  );
};

export const EventEdit = () => (
  <Edit title="Modifier l'événement">
    <EventForm />
  </Edit>
);

import {
  List,
  Datagrid,
  TextField,
  DateField,
  DeleteButton,
  Edit,
  Create,
  Show,
  SimpleShowLayout,
  SimpleForm,
  TextInput,
  DateTimeInput,
  DateInput,
  Filter,
  required,
  useNotify,
  useRedirect,
  useRecordContext,
  TopToolbar,
  EditButton,
  ListButton,
} from 'react-admin';

const EventTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `Événement : ${record.title}` : ''}</span>;
};

const EventFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="title" label="Titre" alwaysOn />
    <TextInput source="location" label="Lieu" />
    <DateInput source="start_date" label="Début après" />
  </Filter>
);

export const EventList = () => (
  <List filters={<EventFilter />} sort={{ field: 'start_date', order: 'DESC' }}>
    <Datagrid rowClick="show">
      <TextField source="title" label="Titre" />
      <TextField source="location" label="Lieu" />
      <DateField source="start_date" label="Début" showTime />
      <DateField source="end_date" label="Fin" showTime />
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

const EventShowActions = () => (
  <TopToolbar>
    <ListButton label="Retour" />
    <EditButton />
  </TopToolbar>
);

const EventEditActions = () => (
  <TopToolbar>
    <ListButton label="Retour" />
  </TopToolbar>
);

export const EventShow = () => (
  <Show title={<EventTitle />} actions={<EventShowActions />}>
    <SimpleShowLayout>
      <TextField source="title" label="Titre" />
      <TextField source="location" label="Lieu" />
      <TextField source="description" label="Description" />
      <DateField source="start_date" label="Date de début" showTime />
      <DateField source="end_date" label="Date de fin" showTime />
    </SimpleShowLayout>
  </Show>
);

export const EventEdit = () => (
  <Edit title={<EventTitle />} actions={<EventEditActions />}>
    <EventForm />
  </Edit>
);

import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  Edit,
  Create,
  Show,
  SimpleShowLayout,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  Filter,
  required,
  ReferenceField,
  useRecordContext,
  TopToolbar,
  EditButton,
  ListButton,
} from 'react-admin';

const RoomTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `Salle : ${record.name}` : ''}</span>;
};

const RoomFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="name" label="Nom" alwaysOn />
    <ReferenceInput source="event_id" reference="events" label="Événement">
      <SelectInput optionText="title" />
    </ReferenceInput>
  </Filter>
);

export const RoomList = () => (
  <List filters={<RoomFilter />}>
    <Datagrid rowClick="show">
      <TextField source="name" label="Nom" />
      <ReferenceField source="event_id" reference="events" label="Événement">
        <TextField source="title" />
      </ReferenceField>
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

const RoomShowActions = () => (
  <TopToolbar>
    <ListButton label="Retour" />
    <EditButton />
  </TopToolbar>
);

const RoomEditActions = () => (
  <TopToolbar>
    <ListButton label="Retour" />
  </TopToolbar>
);

export const RoomShow = () => (
  <Show title={<RoomTitle />} actions={<RoomShowActions />}>
    <SimpleShowLayout>
      <TextField source="name" label="Nom" />
      <ReferenceField source="event_id" reference="events" label="Événement">
        <TextField source="title" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export const RoomEdit = () => (
  <Edit title={<RoomTitle />} actions={<RoomEditActions />}>
    <RoomForm />
  </Edit>
);

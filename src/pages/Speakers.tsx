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
  required,
  ImageField,
  Filter,
  useRecordContext,
  TopToolbar,
  EditButton,
  ListButton,
} from 'react-admin';

const SpeakerTitle = () => {
  const record = useRecordContext();
  return <span>{record ? `Intervenant : ${record.full_name}` : ''}</span>;
};

const SpeakerFilter = (props: any) => (
  <Filter {...props}>
    <TextInput source="full_name" label="Nom" alwaysOn />
    <TextInput source="twitter" label="Twitter" />
    <TextInput source="linkedin" label="LinkedIn" />
  </Filter>
);

export const SpeakerList = () => (
  <List filters={<SpeakerFilter />} sort={{ field: 'full_name', order: 'ASC' }}>
    <Datagrid rowClick="show">
      <TextField source="full_name" label="Nom" />
      <TextField source="twitter" label="Twitter" />
      <TextField source="linkedin" label="LinkedIn" />
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

const SpeakerShowActions = () => (
  <TopToolbar>
    <ListButton label="Retour" />
    <EditButton />
  </TopToolbar>
);

const SpeakerEditActions = () => (
  <TopToolbar>
    <ListButton label="Retour" />
  </TopToolbar>
);

export const SpeakerShow = () => (
  <Show title={<SpeakerTitle />} actions={<SpeakerShowActions />}>
    <SimpleShowLayout>
      <ImageField source="photo_url" label="Photo" />
      <TextField source="full_name" label="Nom" />
      <TextField source="bio" label="Biographie" />
      <TextField source="twitter" label="Twitter" />
      <TextField source="linkedin" label="LinkedIn" />
      <TextField source="website" label="Site web" />
    </SimpleShowLayout>
  </Show>
);

export const SpeakerEdit = () => (
  <Edit title={<SpeakerTitle />} actions={<SpeakerEditActions />}>
    <SpeakerForm />
  </Edit>
);

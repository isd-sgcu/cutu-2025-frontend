// This is the server component that handles routing
import UserDetails from './_components/userDetails';

type tParams = Promise<{ id: string }>;

export default async function Page(props:  { params: tParams }) {
  const { id } =  await props.params;
  return <UserDetails id={id} />;
}

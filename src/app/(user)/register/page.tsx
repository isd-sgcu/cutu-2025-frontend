import Progress from './_components/progress';

export default function page() {
  return (
    <div className='p-6'>
      <Progress step={1} className="mx-auto" />
    </div>
  );
}

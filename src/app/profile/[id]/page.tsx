function page({ params }: any) {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="font-bold text-4xl">Profile Page</h1>
        <br />
        <br />
        <h2 className="font-bold text-2xl">{params.id}</h2>
      </div>
    </>
  );
}

export default page;

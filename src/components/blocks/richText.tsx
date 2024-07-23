export default async function RichText({ data }: any) {
  return (
    <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
  );
};

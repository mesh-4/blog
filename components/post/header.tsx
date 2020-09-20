type Props = {
  title: string;
  date: string;
};

export function PostHeader({ title, date }: Props) {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold tracking-tighter leading-tight md:leading-none text-center md:text-left">
        {title}
      </h1>
      <time className="block mb-6 text-sm text-gray-600">{date}</time>
    </>
  );
}

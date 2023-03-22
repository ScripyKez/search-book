export default function CardBook({ title, img, category, authors }) {
  return (
    <article className="w-[400px] h-[200px] bg-sky-200 flex border-gray-600 border-2 mx-2 mb-2 rounded-lg p-2">
      {img && <img className="w-32" src={img} alt="book" />}
      <div className="ml-2 flex flex-col justify-between w-full">
        <p className="font-medium">{title}</p>
        <p className="underline mb-auto">{category}</p>
        <p className="italic text-sm ml-auto text-right">{authors}</p>
      </div>
    </article>
  );
}

export const ArticleTile = ({
  title,
  author,
  date,
  imageUrl,
  contentPreview,
}: {
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  contentPreview: string;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{author}</p>
        <p className="text-sm text-gray-600">{date}</p>
        <p className="text-sm text-gray-600 mb-4">{contentPreview}</p>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          Read more
        </a>
      </div>
    </div>
  );
};

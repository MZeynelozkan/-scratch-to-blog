function BlogBox({ blog }) {
  const { id, text } = blog;

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{`Blog ID: ${id}`}</h2>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

export default BlogBox;

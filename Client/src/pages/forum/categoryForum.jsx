const CategoryForum = () => {
  const questions = [
    {
      id: 1,
      user: "Golangingya",
      time: "5 min ago",
      title: "How to patch KDE on FreeBSD?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["golang", "linux", "overflow"],
      views: 125,
      comments: 15,
      votes: 155,
    },
    {
      id: 2,
      user: "Linuxoid",
      time: "25 min ago",
      title: "What is a difference between Java and JavaScript?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["java", "javascript", "wtf"],
      views: 125,
      comments: 15,
      votes: 155,
    },
    {
      id: 3,
      user: "AizhanMaratovna",
      time: "2 days ago",
      title:
        "I want to study Svelte JS Framework. What is the best resource should I use?",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tags: ["svelte", "javascript", "recommendations"],
      views: 125,
      comments: 15,
      votes: 155,
    },
  ];

  return (
    <div>
      <h1>Điễn đàn cho [ Java ] </h1>
     
        <div className="flex space-x-2 mb-4">
          {["New", "Top", "Hot", "Closed"].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
              {filter}
            </button>
          ))}
        </div>
        {questions.map((q) => (
          <div key={q.id} className="bg-white shadow rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-500">
              {q.user} • {q.time}
            </div>
            <h2 className="font-semibold mt-1">{q.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{q.content}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {q.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-2 py-1 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between text-gray-500 text-xs mt-3">
              <span>👁 {q.views}</span>
              <span>💬 {q.comments}</span>
              <span>⬆ {q.votes}</span>
            </div>
          </div>
        ))}
      </div>
   
  );
};
export default CategoryForum;
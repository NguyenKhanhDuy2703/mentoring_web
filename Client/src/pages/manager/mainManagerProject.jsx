import { useNavigate } from "react-router-dom";
const MainManagerProject = () => {
  const navigate = useNavigate();
  const projects = [
      {
          title: "Machine Learning",
          description: "Exploring the potential of artificial intelligence in modern applications.",
          files: 20
      },
      {
          title: "Web Development",
          description: "Building responsive and user-friendly web applications.",
          files: 12
      },
      {
          title: "Mobile App Design",
          description: "Creating intuitive and visually appealing mobile interfaces.",
          files: 18
      },
      {
          title: "Cybersecurity",
          description: "Ensuring data protection and secure communication.",
          files: 10
      },
      {
          title: "Cloud Computing",
          description: "Leveraging cloud platforms for scalable solutions.",
          files: 25
      },
      {
          title: "Data Analytics",
          description: "Transforming raw data into actionable insights.",
          files: 15
      }
  ];

  return (
      <div className="p-8 bg-gray-50 min-h-screen">
          {/* Tiêu đề chính */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Manager Projects</h1>
          
          {/* Lưới dự án */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {/* Tiêu đề dự án */}
                      <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-orange-500 pb-2 mb-4">
                          {project.title}
                      </h2>
                      
                      {/* Nội dung dự án */}
                      <div className="bg-gray-100 p-4 rounded-lg">
                          <h3 className="font-bold text-gray-700 mb-2">Description</h3>
                          <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                          
                          {/* Thông tin thêm */}
                          <div className="flex items-center justify-between mt-4">
                              <span className="text-gray-600 text-sm">{project.files} members</span>
                              <button
                               onClick={() => navigate(`/project/${project.id}`)}
                               className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-2 py-1 rounded-lg">
                                  View Details
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default MainManagerProject;
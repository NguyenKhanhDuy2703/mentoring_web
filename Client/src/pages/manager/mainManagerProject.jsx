
const MainManagerProject = () => {
    const projects = Array(6).fill({
        title: "Blockchain and Cryptocurrency",
        description: "Brainstorming brings team members' diverse experience into play.",
        files: 15
      });
    return (
        <div className="grid grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="font-semibold border-b-2 border-orange-500 pb-2 mb-4">
              {project.title}
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold">Description</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-gray-600">{project.files} files</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}
export default MainManagerProject;


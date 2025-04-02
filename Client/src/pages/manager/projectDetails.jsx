import { useParams } from "react-router-dom";

const ProjectDetails = () => {
    const { id } = useParams();

    return (
        <div className="font-roboto bg-gray-100 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                Projects / Mentoring_CDIO
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-sm text-gray-600">Give feedback</button>
                <button className="text-sm text-gray-600">Share</button>
                <button className="text-sm text-gray-600">Export</button>
                <button className="text-sm text-gray-600"><i className="fas fa-ellipsis-h"></i></button>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Timeline</h1>
            <div className="flex items-center mb-4">
              <input type="text" placeholder="Search timeline" className="border border-gray-300 rounded px-2 py-1 text-sm w-64" />
              <div className="flex items-center space-x-2 ml-4">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">T</div>
                <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center">N</div>
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">I</div>
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">TA</div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">AT</div>
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center"><i className="fas fa-user"></i></div>
              </div>
              
            </div>
            <div className="bg-white rounded shadow overflow-hidden">
              <div className="flex items-center border-b border-gray-200">
                <div className="w-1/4 p-2 text-sm font-medium text-gray-600">Sprints</div>
                <div className="w-3/4 p-2 text-sm font-medium text-gray-600 flex justify-between">
                  <div className="w-1/4 text-center">APR</div>
                  <div className="w-1/4 text-center">MAY</div>
                  <div className="w-1/4 text-center">JUN</div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200">
                <div className="w-1/4 p-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-bolt text-purple-600"></i>
                    <span className="text-sm">MC-1 Mentor</span>
                  </div>
                </div>
                <div className="w-3/4 p-2 flex items-center">
                  <div className="w-1/4 h-2 bg-green-500"></div>
                  <div className="w-3/4 h-2 bg-gray-300"></div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200">
                <div className="w-1/4 p-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-bolt text-purple-600"></i>
                    <span className="text-sm">MC-2 Mentee</span>
                  </div>
                </div>
                <div className="w-3/4 p-2 flex items-center">
                  <div className="w-1/4 h-2 bg-green-500"></div>
                  <div className="w-3/4 h-2 bg-gray-300"></div>
                </div>
              </div>
              <div className="flex items-center border-b border-gray-200">
                <div className="w-1/4 p-2 flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-bolt text-purple-600"></i>
                    <span className="text-sm">MC-3 authentication</span>
                  </div>
                </div>
                <div className="w-3/4 p-2 flex items-center">
                  <div className="w-1/4 h-2 bg-green-500"></div>
                  <div className="w-3/4 h-2 bg-gray-300"></div>
                </div>
              </div>
              <div className="p-2 text-sm text-blue-600 cursor-pointer">+ Create Epic</div>
            </div>
            
          </div>
        </div>
      );
    };

export default ProjectDetails;
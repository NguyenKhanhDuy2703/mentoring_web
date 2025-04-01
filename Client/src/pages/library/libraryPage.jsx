const LibraryPage = () => { 

    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
          <div className="container mx-auto p-6">
            {/* Tiêu đề chính */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Thư viện tài liệu</h1>
              <select className="border border-gray-300 rounded p-2 text-sm">
                <option>Chọn chủ đề</option>
              </select>
            </div>

            {/* Danh sách sách */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://storage.googleapis.com/a1aa/image/DerIFY9TUU1CF5941omkD26oLQXEpz32YlLBEjPEREM.jpg"
                  alt="Book cover of 'The Time Has Come'"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-base font-semibold mb-2">The Time Has Come</h2>
                    <p className="text-gray-600 text-sm">
                      Lindbergh's Pharmacy is an Athens, Georgia, institution...
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Chi tiết
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Tải xuống
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://storage.googleapis.com/a1aa/image/x1KDmZ9fM-v28q9AybtLcvNeA6NDA3FsBtGIZu7JWoY.jpg"
                  alt="Book cover of 'I Want a Better Catastrophe'"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-base font-semibold mb-2">I Want a Better Catastrophe</h2>
                    <p className="text-gray-600 text-sm">
                      With global warming projected to rocket past the...
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Chi tiết
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Tải xuống
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://storage.googleapis.com/a1aa/image/FNlKuVE4TDVH2e7sbIt7i6W7ROT0uByM4P_SLTnJjF0.jpg"
                  alt="Book cover of 'My Government Means to Kill Me'"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-base font-semibold mb-2">My Government Means to Kill Me</h2>
                    <p className="text-gray-600 text-sm">
                      With global warming projected to rocket past the...
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Chi tiết
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Tải xuống
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Được đề xuất cho bạn */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-4">Được đề xuất cho bạn</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://storage.googleapis.com/a1aa/image/avTR5IFoGNpNLYr6e7kG_WC0hdX5YZ6B4cUz_YUQoAo.jpg"
                  alt="Book cover of 'Pride and Protest'"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-base font-semibold mb-2">Pride and Protest</h2>
                    <p className="text-gray-600 text-sm">
                      A woman goes head-to-head with the CEO of...
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Chi tiết
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Tải xuống
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://storage.googleapis.com/a1aa/image/ekdjkNMUyxyzto-R-ftnevn7m6oCGrX8jN47xkM64Xc.jpg"
                  alt="Book cover of 'Forget a Mentor, Find a Sponsor'"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-base font-semibold mb-2">Forget a Mentor, Find a Sponsor</h2>
                    <p className="text-gray-600 text-sm">
                      In this powerful yet practical book, economist and...
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Chi tiết
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Tải xuống
                    </button>
                  </div>
                </div>
                
              </div>

              <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://storage.googleapis.com/a1aa/image/cB2aHpsLYluztFcXvDFEnfnh28_EB53j0bbfdTJR73E.jpg"
                  alt="Book cover of 'The Midnight Library'"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-base font-semibold mb-2">The Midnight Library</h2>
                    <p className="text-gray-600 text-sm">
                      In this powerful yet practical book, economist and...
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Chi tiết
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Tải xuống
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };  
export default LibraryPage;
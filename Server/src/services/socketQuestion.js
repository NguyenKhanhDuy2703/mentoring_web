module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("🔗 Client connected:", socket.id);

        // Nhận dữ liệu từ Frontend
        socket.on("send_question_form", (data) => {
            console.log("📩 Nhận câu hỏi:", data);
                
            // Kiểm tra nếu có file thì lưu vào uploads
            if (data.file) {
                console.log("📁 File đính kèm:", data.file);
            }

            // Phát sự kiện để cập nhật danh sách câu hỏi trên FE

            io.emit("newQuestion", data);
        });

        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });
};

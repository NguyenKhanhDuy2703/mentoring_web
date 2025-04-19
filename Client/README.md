src/
│
├── assets/              # Hình ảnh, font, biểu tượng, style global
│   ├── images/
│   └── styles/
│
├── components/          # Các component dùng lại nhiều nơi (dạng UI)
│   └── Button/
│       ├── Button.jsx
│       └── Button.module.css
│
├── features/            # Theo tính năng (feature-based structure)
│   └── Auth/
│       ├── components/  # Component chỉ dùng trong tính năng này
│       ├── pages/       # Trang của tính năng (Login, Register)
│       ├── authSlice.js # Nếu dùng Redux hoặc Zustand
│       └── api.js       # Gọi API liên quan đến Auth
│
├── pages/               # Các trang chính (route) trong app
│   ├── Home.jsx
│   └── About.jsx
│
├── routes/              # Định nghĩa route
│   └── AppRouter.jsx
│
├── services/            # Các hàm gọi API (tách riêng ra khỏi UI)
│   └── productService.js
│
├── store/               # Redux / Zustand / Context API
│   └── index.js
│
├── hooks/               # Custom hooks
│   └── useDebounce.js
│
├── utils/               # Hàm tiện ích
│   └── formatDate.js
│
├── App.jsx              # Root component
└── main.jsx             # Điểm khởi chạy React

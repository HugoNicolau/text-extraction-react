# Text Extraction Frontend (React + Vite + TypeScript)

This is the frontend for a text extraction application. It allows users to upload an image and displays the extracted text using a NestJS backend and FastAPI service.

---

## Related Repositories

- [Frontend Repository (React + Vite + TypeScript)](https://github.com/HugoNicolau/text-extraction-react)


- [Backend Repository (NestJS + TypeScript)](https://github.com/HugoNicolau/text-extraction-nestjs)

- [Backend Repository (FastAPI + Python)](https://github.com/HugoNicolau/text-extraction-py)

---

## Features

- Upload an image for text extraction.
- Display the extracted text.
- Responsive design with Bootstrap (optional).

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- NestJS backend running (for text extraction)

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HugoNicolau/text-extraction-react.git
   cd text-extraction-react
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Replace `http://localhost:3000` with the URL of your NestJS backend.

---

## Running the Project

1. **Start the React app:**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`.

2. **Test the app:**

   - Upload an image using the file input.
   - Click **Extract Text**.
   - The extracted text will be displayed below the form.

---

## Project Structure

```
text-extraction-frontend/
├── public/                  # Static assets
│   └── vite.svg             # Vite logo (optional)
├── src/                     # Source code
│   ├── assets/              # Static assets (e.g., images, fonts)
│   ├── components/          # React components
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # TypeScript types for Vite
├── .env                     # Environment variables
├── .gitignore               # Files to ignore in Git
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

---

## Dependencies

- **axios:** For making HTTP requests to the NestJS backend.
- **react:** The frontend framework.
- **react-dom:** For rendering React components.
- **react-router-dom:** For routing (optional).
- **vite:** The build tool for the frontend.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [React](https://reactjs.org/) for the frontend framework.
- [Vite](https://vitejs.dev/) for the build tool.
- [NestJS](https://nestjs.com/) for the backend.
- [FastAPI](https://fastapi.tiangolo.com/) for the text extraction service.

---

## Contact

For questions or feedback, please reach out to [Hugo Nicolau](mailto:nicolau.hugogiles@gmail.com).

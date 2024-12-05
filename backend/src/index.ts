import { app } from "./app";
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
})();

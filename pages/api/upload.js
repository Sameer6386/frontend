import formidable from "formidable";
import fs from "fs";
import path from "path";
import { generateDocumentation } from "../../backend/services/documentationService";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to check if a file should be uploaded or not
const isValidFile = (filename) => {
  const validExtensions = [".js", ".jsx", ".ts", ".tsx", ".json", ".md"]; // Add more extensions as needed
  const fileExtension = path.extname(filename);

  // Exclude node_modules, .env, and other unnecessary files
  if (
    filename.includes("node_modules") ||
    filename.includes(".env") ||
    !validExtensions.includes(fileExtension)
  ) {
    return false;
  }
  return true;
};

const uploadHandler = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true });
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "File upload failed" });
    }

    const dirPath = path.join(process.cwd(), "/uploaded_files");
    fs.mkdirSync(dirPath, { recursive: true });

    const saveFile = (file) => {
      if (!isValidFile(file.originalFilename)) {
        return; // Skip files that are not valid for documentation
      }

      const filePath = path.join(dirPath, file.originalFilename);
      fs.copyFileSync(file.filepath, filePath);
      fs.unlinkSync(file.filepath);
    };

    // Handle array or single file upload
    if (Array.isArray(files.files)) {
      files.files.forEach(saveFile);
    } else {
      saveFile(files.files);
    }

    // Generate documentation for the uploaded directory
    const documentation = await generateDocumentation(dirPath);
    res.status(200).json({ documentation });
  });
};

export default uploadHandler;

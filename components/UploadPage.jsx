import { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [directory, setDirectory] = useState([]);
  const [documentation, setDocumentation] = useState([]);
  const [showGenerateDocButton, setShowGenerateDocButton] = useState(false);
  const [documentationPreview, setDocumentationPreview] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    const fileArr = Array.from(e.target.files).map((file) => ({
      name: file.webkitRelativePath || file.name,
    }));
    setDirectory(fileArr);
    setShowGenerateDocButton(true); // Reset button visibility on new files
    setDocumentationPreview(null); // Reset preview on new files
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDocumentation(response.data.documentation);
      setShowGenerateDocButton(true); // Show the button after upload
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleGenerateDocumentation = async () => {
    // Example prompt; customize it as needed
    const prompt =
      "Generate documentation for the following files: " +
      (documentation
        ? documentation.map((doc) => doc.fileName).join(", ")
        : ""); // Use an empty string if documentation is null

    try {
      const response = await axios.post("/api/generate-doc", { prompt });
      const generatedDocs = response.data.documentation;
      setDocumentationPreview(generatedDocs); // Set the preview of the documentation
    } catch (error) {
      console.error("Error generating documentation:", error);
    }
  };

  // const handleGenerateDocumentation = async () => {
  //   try {
  //     const response = await axios.post("/api/generate-doc");
  //     const generatedDocs = response.data.documentation;
  //     setDocumentation(generatedDocs);
  //     setDocumentationPreview(generatedDocs); // Set the preview of the documentation
  //   } catch (error) {
  //     console.error("Error generating documentation:", error);
  //   }
  // };
  // Display documentation in JSX
  {
    documentation &&
      documentation.map((doc, index) => (
        <div key={index}>
          <h3>{doc.fileName}</h3>
          <pre>{doc.documentation}</pre>
        </div>
      ));
  }

  const handleDownloadDocumentation = () => {
    const blob = new Blob([JSON.stringify(documentationPreview)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "documentation.json"; // Change the file name as needed
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-4 overflow-y-scroll">
        <h2 className="text-xl font-bold sticky top-0 bg-gray-900 p-2 z-10">
          Project Files
        </h2>
        <ul className="mt-4 space-y-2">
          {directory.map((file, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 text-sm p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a1 1 0 000 2h1v12a2 2 0 002 2h6a2 2 0 002-2V5h1a1 1 0 100-2H4zm7 0v3H9V3h2zm-2 5h2v6H9V8z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 flex flex-col items-center">
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center justify-center border-dashed border-4 border-gray-400 rounded-lg p-6 mb-6 bg-white shadow-lg">
            <input
              type="file"
              webkitdirectory="true"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="text-center text-gray-500 cursor-pointer"
            >
              <div className="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a1 1 0 000 2h1v12a2 2 0 002 2h6a2 2 0 002-2V5h1a1 1 0 100-2H4zm7 0v3H9V3h2zm-2 5h2v6H9V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold">
                Drag and drop files here, or click to browse
              </span>
            </label>
          </div>

          <button
            onClick={handleUpload}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 transition-all"
          >
            Upload Files
          </button>

          {/* Generate Documentation Button */}
          {showGenerateDocButton && (
            <button
              onClick={handleGenerateDocumentation}
              className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg w-full hover:bg-green-700 transition-all"
            >
              Generate Documentation
            </button>
          )}

          {/* Download Documentation Button */}
          {documentationPreview && (
            <button
              onClick={handleDownloadDocumentation}
              className="mt-4 px-6 py-3 bg-yellow-600 text-white rounded-lg w-full hover:bg-yellow-700 transition-all"
            >
              Download Documentation
            </button>
          )}
        </div>

        {/* Display Documentation */}
        {documentation && (
          <div className="w-full max-w-2xl mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-bold mb-4">Generated Documentation</h2>
            {documentation.map((doc, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-sm font-semibold">{doc.fileName}</h3>
                <p className="text-gray-700">{doc.documentation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;

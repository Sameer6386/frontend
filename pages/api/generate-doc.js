import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    // Call function to generate documentation using OpenAI API
    const generatedDocumentation = await generateDocumentation(prompt);

    res.status(200).json({ documentation: generatedDocumentation });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function generateDocumentation(prompt) {
  const apiKey = process.env.OPENAI_API_KEY; // Ensure the API key is correctly set in your .env file
  const endpoint = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await axios.post(
      endpoint,
      {
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Generate detailed documentation for the following code files: "${prompt}"`,
          },
        ],
        temperature: 0.5, // Adjust for the tone of the output
        max_tokens: 1000, // Modify depending on the size of the output needed
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Get the content of the generated documentation from the response
    const documentationContent = response.data.choices[0].message.content;

    // Parse the content into structured format
    return parseDocumentationContent(documentationContent);
  } catch (error) {
    console.error("Error generating documentation:", error);
    return [
      {
        fileName: "error.log",
        documentation: "An error occurred while generating documentation.",
      },
    ];
  }
}

// Function to parse the raw documentation content into structured format
function parseDocumentationContent(content) {
  // Split content into sections by files (assuming the API returns file-specific documentation)
  const sections = content.split("\n\n"); // Assuming double new lines separate each file's doc
  const documentation = sections.map((section) => {
    const lines = section.split("\n");
    const fileName = lines[0].trim(); // The first line is assumed to be the file name
    const documentationText = lines.slice(1).join("\n").trim(); // The rest is the documentation

    return {
      fileName,
      documentation: documentationText,
    };
  });

  return documentation;
}

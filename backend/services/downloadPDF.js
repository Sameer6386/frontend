// pages/api/download-pdf.js
import { generatePDF } from "../../backend/services/documentationService";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  const { documentation } = req.body;
  const fileName = `documentation-${uuidv4()}.pdf`;
  const filePath = path.join(process.cwd(), "public", fileName);

  await generatePDF(documentation, filePath);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);

  // Clean up after the file is downloaded
  fileStream.on("end", () => fs.unlinkSync(filePath));
}

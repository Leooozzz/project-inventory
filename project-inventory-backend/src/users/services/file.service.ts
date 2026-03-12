import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AVATAR_SIZE = 50;
const AVATAR_DIR = path.join(__dirname, "../../../public/avatars");

export const saveAvatar = async (fileBuffer: Buffer, originalName: string) => {
  await fs.mkdir(AVATAR_DIR, { recursive: true });

  const ext = path.extname(originalName);
  const fileName = `avatar-${Date.now()}${ext}`;
  const filePath = path.join(AVATAR_DIR, fileName);

  await sharp(fileBuffer)
    .resize(AVATAR_SIZE, AVATAR_SIZE, {
      fit: "cover",
      position: "center",
    })
    .toFile(filePath);

  return fileName;
};
export const deleteAvatar = async (filename:string) => {
    if(!filename) return;
    const filePath = path.join(AVATAR_DIR,filename);
    await fs.unlink(filePath)
}
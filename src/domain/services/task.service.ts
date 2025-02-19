import sharp from "sharp";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import axios from "axios";

export class TaskService {
  private generateMd5Hash(content: string): string {
    return crypto.createHash("md5").update(content).digest("hex");
  }

  private async downloadImage(
    url: string,
    downloadPath: string
  ): Promise<string | null> {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      fs.writeFileSync(downloadPath, response.data);
      return downloadPath;
    } catch (error) {
      console.error("Error downloading image:", error);
      return null;
    }
  }

  public async processImage(
    image: string
  ): Promise<{ resolution: number; path: string }[]> {
    const resolutions = [1080, 800];
    const images = [];
    let localImagePath = image;

    if (image.startsWith("http://") || image.startsWith("https://")) {
      const fileExtension = path.extname(image) || ".jpg";
      const fileName = this.generateMd5Hash(image) + fileExtension;
      const downloadDir = path.join("temp_images");
      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
      }
      localImagePath = path.join(downloadDir, fileName);

      const downloaded = await this.downloadImage(image, localImagePath);
      if (!downloaded) {
        return [];
      }
    }

    if (!fs.existsSync(localImagePath)) {
      console.error("File does not exist:", localImagePath);
      return [];
    }

    try {
      const fileExtension = path.extname(localImagePath).slice(1);
      const fileName = path.basename(localImagePath, `.${fileExtension}`);
      const md5Hash = this.generateMd5Hash(localImagePath);

      for (const resolution of resolutions) {
        const outputDir = path.join("output", fileName, `${resolution}`);
        const outputPath = path.join(outputDir, `${md5Hash}.${fileExtension}`);

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        await sharp(localImagePath).resize(resolution).toFile(outputPath);

        images.push({ resolution, path: outputPath });
      }
    } catch (error) {
      console.error("Error processing image:", error);
      return [];
    }

    return images;
  }
}

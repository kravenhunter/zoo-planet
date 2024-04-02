import type { MultiPartData } from "h3";
import { Buffer } from "node:buffer";
import { randomUUID } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

const FILES_KEYS = ["name", "filename", "type", "data"];

const getPathObject = (file_name: string, file_type: string) => {
  const [_mime, ext] = String(file_type).split("/");
  const [name, extension] = String(file_name).split(".");
  const fileName = `${randomUUID()}_${name}.${extension}`;
  // Формирование пути для  Linux
  const currentPath = path.resolve(path.dirname("./"), "public");
  // const currentPath = path.resolve(path.dirname('./'), 'public', files.file.originalFilename);

  // Для Windows достаточно рутовой дирректории "./" audio
  const publicPath = _mime.includes("audio")
    ? `./public/audio/upload/${fileName}`
    : `./public/images/upload/${fileName}`;
  const linkPath = _mime.includes("audio")
    ? `audio/upload/${fileName}`
    : `images/upload/${fileName}`;

  return {
    linkPath,
    publicPath,
  };
};
// Проверяем содержит ли  объект все ключи arrKeys
export const isCorrectObject = <T extends Object>(data: T, arrKeys: string[]) => {
  return Object.keys(data).filter((key) => arrKeys.includes(key)).length === arrKeys.length;
};
export const write_FileType_To_Store = async (newFile: File): Promise<string> => {
  const getBufferArray = await newFile.arrayBuffer();

  return await new Promise<string>((resolve, reject) => {
    const { linkPath, publicPath } = getPathObject(newFile.name, newFile.type);
    const writeStream = fs.createWriteStream(publicPath);

    writeStream.write(getBufferArray);
    writeStream.on("error", (error) => {
      const errorStream = fs.createWriteStream(`./public/logs/upload_log.txt`);
      console.log("WriteStream  Error ===", error);
      //Завершаем поток
      writeStream.destroy();
      //Пишем ошибку в лог
      errorStream.write(`Error creating file ${newFile.name}`);
    });
    writeStream.end();
    writeStream.on("finish", () => {
      console.log("File written successfully!");
    });

    resolve(linkPath);
  });
};
export const write_MultiPartData_To_File = async (file: MultiPartData): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    if (isCorrectObject<MultiPartData>(file, FILES_KEYS)) {
      const { linkPath, publicPath } = getPathObject(file.filename!, file.type!);

      const array = Buffer.from(file.data.buffer);

      const writeStream = fs.createWriteStream(publicPath);

      writeStream.write(array);
      writeStream.on("error", (error) => {
        const errorStream = fs.createWriteStream(`./public/logs/upload_log.txt`);
        console.log("WriteStream  Error ===", error);
        //Завершаем поток
        writeStream.destroy();
        //Пишем ошибку в лог
        errorStream.write(`Error creating file ${file.filename}`);
      });
      writeStream.end();
      writeStream.on("finish", () => {
        console.log("File written successfully!");
      });

      resolve(linkPath);
    } else {
      reject(new Error("File data is null"));
    }
  });
};

export const read_And_Write_to_Store = async (file: MultiPartData): Promise<string> => {
  return await new Promise<string>((resolve, reject) => {
    if (isCorrectObject<MultiPartData>(file, FILES_KEYS)) {
      const { linkPath, publicPath } = getPathObject(file.filename!, file.type!);

      const array = Buffer.from(file.data.buffer);

      const readStream = fs.createReadStream(array);
      const writeStream = fs.createWriteStream(publicPath);
      //Создаем обработчик ошибок чтения потока
      function hadleErrorRead() {
        const errorStream = fs.createWriteStream(`./public/image/logs/upload_log.txt`);
        //Уничтожаем поток
        readStream.destroy();
        //Завершаем поток
        writeStream.end();
        //Пишем ошибку в лог
        errorStream.write(`Error creating ${file.filename}`);
      }
      readStream
        .on("error", hadleErrorRead)
        .pipe(writeStream)
        .on("error", hadleErrorRead)
        .end()
        .on("finish", () => {
          console.log("File written successfully!");
        });

      resolve(linkPath);
    } else {
      reject(new Error("File data is null"));
    }
  });
};

const simple_example = () => {
  const buffer = Buffer.from("hello world");
  const writeStream = fs.createWriteStream(`./public/image/upload/file.txt`);
  writeStream.write(buffer);
  writeStream.end();
};

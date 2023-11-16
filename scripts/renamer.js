const fs = require('fs');
const path = require('path');

function renameFilesInDirectory(directoryPath, currentName, newName) {
  // Перевіряємо, чи існує директорія
  if (!fs.existsSync(directoryPath)) {
    console.log(`Директорія '${directoryPath}' не існує.`);
    return;
  }

  // Отримуємо список всіх об'єктів у директорії
  const items = fs.readdirSync(directoryPath);

  items.forEach((item) => {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      // Якщо це піддиректорія, викликаємо функцію рекурсивно
      renameFilesInDirectory(itemPath, currentName, newName);
    } else if (stats.isFile() && item === currentName) {
      // Якщо це файл і його ім'я збігається з currentName, перейменовуємо його
      const newPath = path.join(directoryPath, newName);
      fs.renameSync(itemPath, newPath);
      console.log(`Файл '${item}' був перейменований на '${newName}'.`);
    }
  });
}

const directoryPath = 'D:\\dev\\react-project'; // Вставте сюди шлях до директорії
const currentName = '_index.module.scss'; // Вставте поточну назву файлу
const newName = '_styles.module.scss'; // Вставте нову назву файлу

module.exports = () => renameFilesInDirectory(directoryPath, currentName, newName);
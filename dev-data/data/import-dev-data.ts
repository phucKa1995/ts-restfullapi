import fs from 'fs';
import dotenv from 'dotenv';
import { Tour } from '../../models/tourModel';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE || undefined;
if (DB) {
  mongoose
    .connect(DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log('DB connection successful!');
    });
}

// READ JSON FILE
const dirPath = path.join(__dirname, './tours-simple.json');
const tours = JSON.parse(fs.readFileSync(dirPath, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

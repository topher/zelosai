import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { Profile } from '@/app/types';

// IProfileParams interface
export interface IProfileParams {
  sport?: string;
  location?: string;
  name?: string;
}

interface IAthleteParams {
  id?: string;
  name?: string;
  sport?: string;
  location?: string;
  Medalist_isCategory?: boolean;
  RecordHolder_isCategory?: boolean;
  // Add other fields as needed...
  imageSrc?: string;
}

const athleteToProfile = (athlete: any): Profile => {
  // console.log("🧪 athlete", athlete);
  return {
    id: athlete.id,
    name: athlete.name,
    sport: athlete.sport,
    location: athlete.location,
    imageSrc: athlete.imageSrc,
  };
};

export default async function getProfiles(params?: IProfileParams): Promise<Profile[]> {
  console.log("getProfiles function called with params:", params);

  const filePath = path.join(process.cwd(), 'public', 'athlete_samples_data_updated_oct18_1.csv'); // Adjust the path to your CSV file

  return new Promise((resolve, reject) => {
    const athletes: IAthleteParams[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row: IAthleteParams) => {
        // Optionally, you can filter rows here based on `params`
        let matches = true;

        if (params?.sport && row.sport !== params.sport) matches = false;
        if (params?.location && row.location !== params.location) matches = false;
        if (params?.name && !row.name.includes(params.name)) matches = false;

        if (matches) {
          athletes.push(row);
        }
      })
      .on('end', () => {
        // Transform the data into the Profile format
        const profiles = athletes.map(athleteToProfile);
        resolve(profiles);
      })
      .on('error', (error: { message: any; }) => {
        console.error("Error reading or parsing CSV file:", error.message || error);
        reject(new Error("Failed to retrieve athlete profiles. Please try again later."));
      });
  });
}

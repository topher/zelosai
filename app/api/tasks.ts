// pages/api/tasks.ts
import { NextApiRequest, NextApiResponse } from 'next';

const tasks = [
  { id: 1, title: 'Design the website', progress: 80, dueDate: '2024-02-02' },
  { id: 2, title: 'Develop new feature', progress: 60, dueDate: '2024-03-15' },
  { id: 3, title: 'Deploy to production', progress: 40, dueDate: '2024-04-22' },
  // ...other dummy tasks
];

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // Return the dummy data as JSON
  res.status(200).json(tasks);
}

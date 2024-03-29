// Make a getAllProjects NextJS api endpoint

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/server/dbConnect';
import Project from '@/lib/models/Project';
import { ProjectData } from '@/lib/types';

function getAllProjects(
  req: NextApiRequest,
  res: NextApiResponse<ProjectData[] | { message: string }>
) {
  switch (req.method) {
    case 'GET':
      return getProjects(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// TAR ALLE ProjectS FRA DATABASEN
async function getProjects(
  req: NextApiRequest,
  res: NextApiResponse<ProjectData[] | { message: string }>
) {
  await dbConnect();

  try {
    const Projects = await Project.find({});
    res.status(200).json(Projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Projects.' });
  }
}

export default getAllProjects;

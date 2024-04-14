// Make a getAllProjects NextJS api endpoint

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/server/dbConnect';
import Project from '@/lib/models/Project';
import { ProjectData } from '@/lib/types';
import { getToken } from 'next-auth/jwt';

function getAllProjects(
  req: NextApiRequest,
  res: NextApiResponse<ProjectData[] | { message: string }>
) {
  switch (req.method) {
    case 'GET':
      return getProjects(req, res);
    case 'POST':
      return CreateProject(req, res);
    default:
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
    const projects = await Project.find({})
      .populate({
        path: 'developers.user',
        select: 'name email', // Adjust fields as needed
      })
      .exec();
    // DEBUG!
    console.log(JSON.stringify(projects, null, 2));
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Projects.' });
  }
}

async function CreateProject(
  req: NextApiRequest,
  res: NextApiResponse<ProjectData[] | { message: string }>
) {
  await dbConnect();

  try {
    if (!req.body.name || !req.body.description || !req.body.user) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    console.log(req.body.user.id);

    const newProj = {
      name: req.body.name,
      description: req.body.description,
      status: 'active',
      developers: {
        user: req.body.user.user.id,
        role: 'admin',
      },
    };
    const ProjectCreated = await Project.create(newProj);
    res.status(201).json(ProjectCreated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Project.' });
  }
}

export default getAllProjects;

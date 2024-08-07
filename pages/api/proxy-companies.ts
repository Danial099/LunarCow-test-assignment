import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch('https://venefish.enesien.com/api/companies');

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch companies' });
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

export default handler;

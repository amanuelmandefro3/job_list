// pages/api/fetchData.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchData, ApiResponse } from '../service/apiService';

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse | { error: string }>) => {
  try {
    const data = await fetchData('https://api.example.com/data');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;

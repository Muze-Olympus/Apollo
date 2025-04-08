import type { NextApiRequest, NextApiResponse } from 'next';
import { getLinkPreview } from 'link-preview-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (typeof url !== 'string') {
    return res.status(400).json({ status: 'error', message: 'Invalid or missing URL' });
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const data = await getLinkPreview(decodedUrl);

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.error('Link preview error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch preview' });
  }
}

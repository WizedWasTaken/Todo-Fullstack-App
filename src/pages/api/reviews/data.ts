// pages/api/data.js

/**
 *
 * @param req request
 * @param req.method method
 * @param res response
 * @param res.status status
 * @param res.setHeader setHeader
 */
export default function handler(
  req: { method: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  }
) {
  // Check the HTTP method
  if (req.method === 'GET') {
    // Send back a JSON response
    res.status(200).json({ message: 'This is some data from the API' });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

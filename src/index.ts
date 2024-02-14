import express, { Express, Request, Response } from 'express';

const PORT = process.env.PORT || 3001

const app: Express = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Note Taking App');
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
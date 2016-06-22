import Express from 'express';

const app = new Express();

app.use('/', (req, res) => res.sendStatus(200));

app.listen(3001);

export default app;

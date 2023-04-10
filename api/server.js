import { create, router as _router } from 'json-server';
import cors from 'cors';

const server = create();
const router = _router('database/db.json');

server.use(cors());
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
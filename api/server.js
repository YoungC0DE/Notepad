import { create, router as _router } from 'json-server'
import cors from 'cors'

const server = create()
const router = _router('database/db.json')
const port = process.env.PORT || 3000

server.use(cors())
server.use(router)

server.listen(port, () => {
  console.log('JSON Server is running')
})

import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(routes)
app.use(express.json())

export const startServer = (port: number) => {
  return new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Servidor Express escuchando en el puerto ${port}`)
      resolve()
    })

    server.on('error', reject)
  })
}

export default app

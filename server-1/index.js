const axios = require('axios')
const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world', server: '1' })
})

fastify.get('/server', async (request, reply) => {
  const serverResponse = await axios.get(`http://${process.env.SERVER_HOST || 'localhost'}:${process.env.SERVER_PORT || 3001}`)
  reply.send(serverResponse.data)
})


// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
})
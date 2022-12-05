const axios = require('axios')
const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world', server: '2' })
})


fastify.get('/server', async (request, reply) => {
  const serverResponse = await axios.get('http://0.0.0.0:3000')
  reply.send(serverResponse.data)
})


// Run the server!
fastify.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
})
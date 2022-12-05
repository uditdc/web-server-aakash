const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world', server: '2' })
})

// Run the server!
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) throw err
})
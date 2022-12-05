const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world', server: '1' })
})

// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
})
const ethers = require('ethers')
const axios = require('axios')
const fastifyEnv = require('@fastify/env')
const fastify = require('fastify')({
  logger: true
})

fastify.register(fastifyEnv, {
  schema: {
    type: 'object',
    required: ['WS_HOST', 'SERVER_HOST', 'SERVER_PORT'],
    properties: {
      WS_HOST: { type: 'string' },
      SERVER_HOST: { type: 'string' },
      SERVER_PORT: { type: 'number' }
    }
  },
  dotenv: true
})

// Declare a route
fastify.get('/', async (request, reply) => {
  const provider = new ethers.providers.WebSocketProvider(process.env.WS_HOST)
  reply.send({ hello: 'world', server: '1', blockNumber: await provider.getBlockNumber() })
})

fastify.get('/server', async (request, reply) => {
  const serverResponse = await axios.get(`http://${process.env.SERVER_HOST || 'localhost'}:${process.env.SERVER_PORT || 3001}`)
  reply.send(serverResponse.data)
})


// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
})
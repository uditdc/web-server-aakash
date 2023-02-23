const ethers = require('ethers')
const axios = require('axios')
const fastify = require('fastify')({
  logger: true
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
import http from 'node:http'
import { bodyParser } from './middlewares/body-parser.js'
import { routes } from './routes.js'
import { exctratQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await bodyParser(req, res)
    
    const route = routes.find((route) => {
        return method === route.method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)
        
        const {query, ...params} = routeParams.groups

        req.params = params

        req.query = query ? exctratQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(401).end()
})

server.listen({
    port: 5555
})
export async function bodyParser(req, res) {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const rawData = Buffer.concat(buffers)
    const contentType = req.headers['content-type']


    if (contentType?.includes('application/json')) {
        try {
            req.body = JSON.parse(rawData.toString())
        } catch {
            req.body = null
        }
    }
    else if (contentType?.includes('multipart/form-data')) {
        req.body = rawData
    } 
    else {
        req.body 
    }

    res.setHeader('Content-type', 'application/json')
}
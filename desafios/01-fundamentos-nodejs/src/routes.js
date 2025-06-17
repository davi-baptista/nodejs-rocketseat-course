import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import { parse } from "csv-parse"
import fs from 'node:fs'

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)
            
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks/upload_csv'),
        handler: async(req, res) => {
            const raw = req.body.toString()

            // Extrai a parte que vem depois dos cabeçalhos do multipart
            const match = raw.match(/\r\n\r\n([\s\S]*?)\r\n--/)
            const content = match[1]
            
            const parser = parse(content, {
                    delimiter: ',',
                    columns: true,
                    skip_empty_lines: true,
                    trim: true,
            })
            
            for await(const row of parser) {
                const allKeys = Object.keys(row)

                const titleKey = allKeys.find(key => key.trim().toLowerCase() === 'title')
                const title = row[titleKey]
                
                const descriptionKey = allKeys.find(key => key.trim().toLowerCase() === 'description')
                const description = row[descriptionKey]

                const task = {
                    title,
                    description
                }

                await fetch('http://localhost:5555/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
            console.log(task)
            database.insert('tasks', task)
            
            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            
            const { title, description } = req.body

            database.update('tasks', id, {
                title,
                description
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params

            database.update('tasks', id, {
                completed_at: new Date().toISOString()
            })

            return res.writeHead(204).end()
        }
    }
]
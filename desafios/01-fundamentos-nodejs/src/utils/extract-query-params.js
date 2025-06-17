//?search=teste&test=123
export function exctratQueryParams(query) {
    return query
    .substr(1)
    .split('&')
    .reduce((exctratQueryParams, params) =>{
        const [key, value] = params.split('=')

        exctratQueryParams[key] = value

        return exctratQueryParams
    }, {})
}
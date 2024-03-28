import http from 'k6/http'
import { check } from 'k6'

export default function() {
    const rest = http.get('https://test.k6.io')
    check(rest.status, {
        'status is 200': (value) => value === 200
    })
}
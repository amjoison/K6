import http from 'k6/http'
import { sleep } from 'k6'
import { Counter, Trend } from 'k6/metrics'

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000'],
        'http_req_duration{status:503}': ['p(95)<1000'],
    }
}

export default function() {
    http.get('https://demo6789574.mockable.io/')
    http.get('https://demo6789574.mockable.io/test')
}
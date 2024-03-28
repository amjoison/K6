import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<120'],
        http_req_duration: ['max<2000'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count > 20'],
        http_reqs: ['rate > 4'],
        vus: ['value > 9'],
        checks: ['rate >= 0.98']
    }
}

export default function() {
    const rest = http.get('https://test.k6.io')
    check(rest, {
        'status is 200': (response) => response.status === 200,
        'page is start page': (response) => response.body.includes('Collection of simple web')
    })
    sleep(2)
}
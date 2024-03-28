import http from 'k6/http'
import { check, sleep } from 'k6'
import { Counter } from 'k6/metrics'


export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<120'],
        my_counter: ['count > 10']
    }
}

let myCounter = new Counter('my_counter')

export default function() {
    const rest = http.get('https://test.k6.io')
    myCounter.add(1)
    sleep(2)
}
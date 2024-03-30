import http from 'k6/http'
import { Counter } from 'k6/metrics'
import { check, sleep } from 'k6'

export const options = {
    thresholds: {
        'http_req_duration{page:order}': ['p(95)<500'],
        'http_errors{page:order}': ['count==0'],
        'checks{page:order}': ['rate>=0.99']
    }
}

let httpErrors = new Counter('http_errors')

export default function() {
    let resp = http.get('https://demo6789574.mockable.io/')
    
    if(resp.error) {
        httpErrors.add(1)
    }

    check(resp, {
        'status is 200': (r) => r.status === 200
    })

    sleep(1)

    resp = http.get('https://demo6789574.mockable.io/test',
        {
            tags: {
                page: 'order'
            }
        }
    )

    if(resp.error) {
        httpErrors.add(1, {page: 'order'})
    }

    check(
        resp, 
        {'status is 201': (r) => r.status === 201},
        {page: 'order'}
    )

    sleep(1)

}
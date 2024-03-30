import http from 'k6/http'
import { check, sleep, group } from 'k6'

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<250'],
        'group_duration{group:::Main page::Assets}': ['p(95)<250'],
    }
}

export default function() {
    group('Main page', function() {
        let resp = http.get('https://test.k6.io')
        check(resp, {'status is 200': (r) => r.status === 200})
    
        group('Assets', function() {
            http.get('https://test.k6.io/static/css/site.css')
            http.get('https://test.k6.io/static/js/prisms.js')
            http.get('https://test.k6.io/static/favicon.ico')
        })
    })

    group('News page', function() {
        http.get('https://test.k6.io/news.php')
    })

    sleep(1)
}
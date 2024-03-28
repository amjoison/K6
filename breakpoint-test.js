import http from 'k6/http';
import { sleep } from 'k6'

export const options = {
    stages: [
        {
            duration: '30s',
            target: 1000
        }
    ]
}

export default function() {
    http.get('https://test.k6.io');
    sleep(1);
}

import axios from 'axios';

type PostBinaryDataProps = {
    data: any;
    endpoint: string;
}

export default async function putBinaryData({ data, endpoint }: PostBinaryDataProps) {
    const result = await axios({
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'multipart/form-data',
        },
        method: 'PUT',
        url: `http://192.168.1.215:2000/${endpoint}`,
    }).then(res => {
        console.log('I am being hit');
        return res.data;
    })
    .catch(err => {
        const { isSuccess, message } = err.response.data;
        return { isSuccess, message };
    });

    return result;
}
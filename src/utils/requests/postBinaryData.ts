import axios from 'axios';

type PostBinaryDataProps = {
    data: any;
    endpoint: string;
}

export default async function postBinaryData({ data, endpoint }: PostBinaryDataProps) {
    const result = await axios({
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'multipart/form-data',
        },
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URI}${endpoint}`,
    }).then(res => {
        return res.data;
    })
    .catch(err => {
        const { isSuccess, message } = err.response.data;
        return { isSuccess, message };
    });

    return result;
}
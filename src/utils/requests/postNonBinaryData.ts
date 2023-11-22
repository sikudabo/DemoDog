import axios from 'axios';

type PostNonBinaryDataProps = {
    data: any;
    endpoint: string;
};

export const postNonBinaryData = async ({ data, endpoint }: PostNonBinaryDataProps) => {
    const result = await axios({
        data,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `http://192.168.1.215:2000/${endpoint}`,
    }).then(res => {
        return res.data;
    })
  .catch(err => {
        const { isSuccess, message } = err.response.data;
        return { isSuccess, message };
    });

    return result;
};

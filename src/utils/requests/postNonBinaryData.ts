import axios from 'axios';

type PostNonBinaryDataProps = {
    data: any;
    endpoint: string;
    microServiceUrl?: string;
};

export const postNonBinaryData = async ({ data, endpoint, microServiceUrl = '' }: PostNonBinaryDataProps) => {
    const result = await axios({
        data,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `${microServiceUrl ? microServiceUrl : process.env.REACT_APP_BASE_URI}${endpoint}`,
    }).then(res => {
        return res.data;
    })
  .catch(err => {
        const { isSuccess, message } = err.response.data;
        return { isSuccess, message };
    });

    return result;
};

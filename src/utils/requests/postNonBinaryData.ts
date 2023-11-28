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
        url: `${process.env.REACT_APP_BASE_URI}${endpoint}`,
    }).then(res => {
        return res.data;
    })
  .catch(err => {
        const { isSuccess, message } = err.response.data;
        return { isSuccess, message };
    });

    return result;
};

import axios from 'axios';

type DeleteDataProps = {
    data: any;
    endpoint: string;
};

export default async function deleteData({ data, endpoint }: DeleteDataProps) {
    const result = await axios({
        data,
        method: 'DELETE',
        url: `http://192.168.1.215:2000/${endpoint}`,
    }).then(res => {
        return res.data;
    })
   .catch(err => {
        const { isSuccess, message } = err.response.data;
        return { isSuccess, message };
    });

    return result;
}
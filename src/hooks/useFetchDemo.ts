import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useFetchDemo = (demoId: string) => {
    const navigate = useNavigate();

    return useQuery(['fetchDemo', demoId], async () => {
        const demo = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URI}api/fetch-demo/${demoId}`,
        }).then(res => {
            const { demo: demoToReturn } = res.data;
            return demoToReturn;
        }).catch(err => {
            console.log(err.message);
            navigate(-1);
            return null;
        });

        return demo;
    });
}
import { getCookie } from "./cookies";
import { api } from "../../utils/constants";
import { checkResponse  } from "../../utils/checkRes";
import { AppThunk } from "../rootState/rootState";



const fetchData = async (url:string, options: RequestInit) => {
    try {
        const response = await fetch(url, options);
        const data = await checkResponse(response);
        return { success: response.ok, data };
    } catch (error) {
        return { success: false, error };
    }
}



export const getUser = async () => {
    const url = `${api}auth/user`;
    const options: RequestInit = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: getCookie('accessToken') || '',
        }
    };

    return await fetchData(url, options);
};

export const getNewToken = async () => {
    const url = `${api}auth/token`;
    const options:RequestInit = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },

        body: JSON.stringify({
            token: getCookie('refreshToken'),
        })
    }

    return await fetchData(url,options);
}

export const getOrderNumber = async (number: string) => {
    const url=`${api}orders/${number}`

    const options: RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        }
    }

    return await fetchData(url,options);
}
/*
    fetch(`${api}auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify({
            email,
            name
        })

    }).then(res => {
        return res.json();
    })
    .catch(err => {
        dispatch({
            type: DATA_FAILED,
        });
    })

}



    fetch(`${api}auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: getCookie('token')
        })
    }).then(res => {
        return res.json();
    })
    .catch(err => {
        dispatch({
            type: DATA_FAILED,
        });
    })

*/
const axios = require('axios');

export const getTrombinoscope = idboard => {
    return axios
        .get(`${process.env.REACT_APP_TROMBINOSCOPE_ROUTE}/${idboard}`)

        .then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data;
        });
};

export const getPersonnalInformation = idboard => {
    return axios
        .get(`${process.env.REACT_APP_PERSONALINFORMATIONS}/${idboard}`)

        .then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data;
        });
};

export const getMessages = idboard => {
    return axios
        .get(`${process.env.REACT_APP_MESSAGE_ROUTE}/${idboard}`)

        .then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data;
        });
};

export const allowAuthentication = (idboard, password) => {
    if (!idboard || !password) {
        return;
    }
    return axios
        .get(`${process.env.REACT_APP_STUDENT_ROUTE}/${idboard}`)
        .then(response => {
            if (response.data[0] && password === response.data[0].password) {
                return response.data[0].idboard;
            }
            alert('Informations incorrectes');
            return;
        })
        .catch(err => console.log(err));
};

export const fetchUser = idboard => {
    return axios
        .get(`${process.env.REACT_APP_STUDENT_ROUTE}/${idboard}`)
        .then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data;
        });
};

export const fetchCourses = (idClass, startDate, endDate) => {
    return axios
        .get(
            `${process.env.REACT_APP_COURSES_ROUTE}/${idClass}/${startDate}/${endDate}`,

            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
        .then(response => {
            return response.data;
        });
};

export function getInternship(id = null) {
    let path = process.env.REACT_APP_STAGES_ROUTE;
    if (id != null) path += `/${id}`;
    return axios.get(path).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        return response.data;
    });
}

export const uploadAvatar = (newAvatar, idboard) => {
    try {
        return axios.patch(
            `${process.env.REACT_APP_STUDENT_ROUTE}/${idboard}`,
            {
                avatar: newAvatar,
            }
        );
    } catch (e) {
        return e.response.status;
    }
};

export async function getMarks(idboard, classId) {
    return axios
        .get(`${process.env.REACT_APP_MARKS_ROUTE}/${idboard}/${classId}`)
        .then(response => response.data);
}

export function getCourses(id = null) {
    let path = process.env.REACT_APP_COURSES_ROUTE;
    if (id != null) path += `/${id}`;
    return axios.get(path).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        return response.data;
    });
}



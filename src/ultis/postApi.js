import axios from "axios";

const BASE_URL = "https://8081-idx-movie-project-1717140701197.cluster-bs35cdu5w5cuaxdfch3hqqt7zm.cloudworkstations.dev";
const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LW1vdmllLXByb2plY3QtMTcxNzE0MDcwMTE5Ny5jbHVzdGVyLWJzMzVjZHU1dzVjdWF4ZGZjaDNocXF0N3ptLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTcyMDc1NDAxNSwiZXhwIjoxNzIwNzU3NjE1fQ.iGJ1cVyvnnTFLGg599idelOiWai_ZrL40vT0YPZEq25sAL39_p2fNMzTcG32vN77bUNqrht-SImdI1QFuQ0MEgAvN0n5ZSEyfQOmMTXqNSwafv5hVzhMJoRZfbaLZ8uk5rjVPTuJaqethnHtJxDd5pYu1lYhu-amtIcCLF1da2WQYAe9btalnN5U4u_ty2UbWVuEywo80MN29wZQL7AkKC3G4P4rohyJ4h6lO1LEqNusgekBLEob6m5V5PIasqqG5oL9vSh-VJBw8qXWqJqlAkM-mH0u5_5ADsNiBsZxwQ985d94FUD_gzr382qOfJ1D-pb8tsj6tAjCXa_7gCp8EQ"

export const postDataToAPI = async(url, body, cookie, params) => {
    try {
        console.log(url)
        console.log(body)
        const {data} = await axios.post(
            BASE_URL + url,
            body,
            {
                headers: {
                    Authorization: "bearer " + TOKEN,
                    Cookie: cookie
                },
                params,
                withCredentials: true
            }
        )
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
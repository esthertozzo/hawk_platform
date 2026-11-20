const API_URL = process.env.NEXT_PUBLIC_HAWK_API_URL;

export async function apiFetch(endpoint, options = {}){
    if(!API_URL) {
        throw new Error("A URL da API HAWK não foi configurada.");
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options, 
    });

    const data = response.status === 204 ? null : await response.json();

    if (!response.ok){
        const message = 
        data?.detail?.[0]?.msg ||
        data?.detail ||
        "Não foi possível concluir a operação.";

        throw new Error(message);
    }

    return data;

}
export  function checkResponse(res:any) {
    if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
    }
    return res.json();
}
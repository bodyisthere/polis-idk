export async function getPageInfo(client, setPop, setPopMessage, setError, setIsLoading) {
    const res = await fetch(`http://localhost:4444/page/${window.location.pathname.split('/')[2]}`);
    if(!res.ok) {
        const json = await res.json();
        setPop('declined');
        setPopMessage(json);
        setTimeout(() => setPop(false), 5000);
        if(setError) setError(true);
        return setIsLoading(false);
    }
    const json = await res.json();
    client(json);
    return setIsLoading(false);
}

async function post() {
    const outputer = document.getElementById('1') as HTMLOutputElement || null
    const button = document.getElementById('2') as HTMLButtonElement || null
    const nameOutputer = document.getElementById('3') as HTMLOutputElement || null

    if (!outputer || !button || !nameOutputer){
        console.log('failed to find html elements')
        alert('error')
        return;
    }

    const val = Number(outputer.value)
    const namev = nameOutputer.value

    try{
        const response = await fetch("/api/p", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: val, name: namev})
        })
    }
    catch(error){
        console.log(error)
    }
}

(window as any).post = post;
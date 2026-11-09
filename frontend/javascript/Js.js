"use strict";
async function post() {
    const outputer = document.getElementById('1') || null;
    const button = document.getElementById('2') || null;
    const nameOutputer = document.getElementById('3') || null;
    if (!outputer || !button || !nameOutputer) {
        console.log('failed to find html elements');
        alert('error');
        return;
    }
    const val = Number(outputer.value);
    const namev = nameOutputer.value;
    try {
        const response = await fetch("/api/p", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: val, name: namev })
        });

        const answer = await response.json()
        console.log(answer)
        
    }
    catch (error) {
        console.log(error);
    }
}
window.post = post;

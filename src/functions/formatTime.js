
export function formatSeconds(seconds) {
    
    const hours = Math.floor(seconds / 3600); // kokonaiset tunnit
    const mins = Math.floor(seconds % 3600 / 60); // tuntien jakojäännös jaetaan 60 saadaan ylijäävät minuutit
    const secs = seconds % 60; 

    return `${hours}h: ${mins}min: ${secs}s`;
}

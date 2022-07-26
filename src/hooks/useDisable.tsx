const disableMenu= () => {
    if (window.location.hostname === 'tauri.localhost') {
        return
    }

    document.addEventListener('contextmenu',  (e: any) => {
        e.preventDefault()
        return false
    },{ capture: true })

    document.addEventListener('selectstart', (e: any) => {
        e.preventDefault()
        return false
    }, { capture: true })
}

export const useDisable = () => {
    document.addEventListener('contextmenu', event => event.preventDefault());
}
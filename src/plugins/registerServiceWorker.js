if("serviceWorker" in navigator) {
	navigator.serviceWorker.register("firebase-messaging-sw.js", {scope: "firebase-cloud-messaging-push-scope"})
		.then(reg => {
			console.log(`Service Worker Registration (Scope: ${reg.scope})`)
		})
		.catch(error => {
			const msg = `Service Worker Error (${error})`
			console.error(msg)
		})
} else {
	// happens when the app isn't served over HTTPS or if the browser doesn't support service workers
	console.warn("Service Worker not available")
}
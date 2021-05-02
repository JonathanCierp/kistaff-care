const getUid = () => {
	return "_" + Math.random().toString(36).substr(2, 9)
}
const ucFirst = s => {
	if(typeof s !== "string") return ""
	return s.charAt(0).toUpperCase() + s.slice(1)
}
const getId = (i => () => i++)(0)
const normalize = s => {
	return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
const moveTawkToWidget = () => {
	/*const iframes = document.querySelectorAll("body > div > iframe")
	iframes.forEach(iframe => iframe.style.marginBottom = "3.5rem")
	if(window.innerWidth <= 500) {
		iframes[0].style.display = "none"
	}*/
}

export {
	getUid,
	ucFirst,
	getId,
	normalize,
	moveTawkToWidget
}

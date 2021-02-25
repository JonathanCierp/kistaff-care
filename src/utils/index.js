export const getUid = () => {
	return "_" + Math.random().toString(36).substr(2, 9)
}

export const ucFirst = s => {
	if(typeof s !== "string") return ""
	return s.charAt(0).toUpperCase() + s.slice(1)
}
const getUid = () => {
	return "_" + Math.random().toString(36).substr(2, 9)
}
const ucFirst = s => {
	if(typeof s !== "string") return ""
	return s.charAt(0).toUpperCase() + s.slice(1)
}
const getId = (i => () => i++)(0)

export {
	getUid,
	ucFirst,
	getId
}
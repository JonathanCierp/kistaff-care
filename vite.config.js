import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
//import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		/*VitePWA({
			manifest: {
				"name": "Kistaff",
				"short_name": "Kistaff",
				"start_url": "/",
				"display": "standalone",
				"theme_color": "#3E66FB",
				"background_color": "#fff",
				"icons": [
					{
						"src": "/img/logoPWA.png",
						"sizes": "144x144",
						"type": "image/png"
					}
				]
			}
		})*/
	],
	server: {
		port: 3001
	}
})

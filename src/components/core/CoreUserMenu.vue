<template>
	<ul class="core-user-menu">
		<CoreUserMenuItem v-for="link of links" :key="link.key" :class="[$route.path === link.to ? 'core-user-menu__link--active' : '']"
		                  :link="link" class="core-user-menu__link" @click="onChangeRoute"
		/>
	</ul>
</template>

<script>
	import { defineComponent } from "vue"
	import { useRouter } from "vue-router"

	export default defineComponent({
		name: "CoreUserMenu",
		setup: (props, { emit }) => {
			const router = useRouter()
			/* Datas */
			const links = [
				{
					key: "mon-profil",
					label: "Mon profil",
					icon: "IconCircleOutlineUser",
					to: "/profiles"
				},
				{
					key: "mes-documents",
					label: "Mes documents",
					icon: "IconOutlinedDocument",
					to: "/documents"
				},
				{
					key: "me-deconnecter",
					label: "Me déconnecter",
					icon: "IconOutlinedLogout",
					callback: () => {
						localStorage.removeItem("jwt")
						router.go(0)
					}
				}
			]

			/* Methods */
			const onChangeRoute = () => {
				emit("change-route")
			}

			return {
				/* Datas */
				links,
				/* Methods */
				onChangeRoute
			}
		}
	})
</script>